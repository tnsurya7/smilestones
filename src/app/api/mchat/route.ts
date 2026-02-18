import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Calculate M-CHAT score and risk level
function calculateMCHAT(answers: any) {
  let score = 0;
  
  // Count "No" answers (each No = 1 point)
  Object.values(answers).forEach((answer) => {
    if (answer === 'No') score++;
  });

  let riskLevel = 'Low Risk';
  if (score >= 8) riskLevel = 'High Risk';
  else if (score >= 3) riskLevel = 'Medium Risk';

  return { score, riskLevel };
}

// GET M-CHAT by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');

    if (!childId) {
      return NextResponse.json({ error: 'child_id is required' }, { status: 400 });
    }

    const result = await sql`
      SELECT * FROM mchat_screenings 
      WHERE child_id = ${childId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching M-CHAT:', error);
    return NextResponse.json({ error: 'Failed to fetch M-CHAT' }, { status: 500 });
  }
}

// POST - Create or update M-CHAT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, answers } = body;

    const { score, riskLevel } = calculateMCHAT(answers);

    // Check if M-CHAT exists
    const existing = await sql`
      SELECT id FROM mchat_screenings WHERE child_id = ${child_id}
    `;

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await sql`
        UPDATE mchat_screenings
        SET answers = ${JSON.stringify(answers)},
            total_score = ${score},
            risk_level = ${riskLevel},
            updated_at = NOW()
        WHERE child_id = ${child_id}
        RETURNING *
      `;
    } else {
      // Create new
      result = await sql`
        INSERT INTO mchat_screenings (child_id, answers, total_score, risk_level)
        VALUES (${child_id}, ${JSON.stringify(answers)}, ${score}, ${riskLevel})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving M-CHAT:', error);
    return NextResponse.json({ error: 'Failed to save M-CHAT' }, { status: 500 });
  }
}

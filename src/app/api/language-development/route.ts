import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET language development by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');
    const age = searchParams.get('age');

    if (!childId) {
      return NextResponse.json({ error: 'child_id is required' }, { status: 400 });
    }

    // If age is specified, get that specific assessment
    if (age) {
      const result = await sql`
        SELECT * FROM language_development 
        WHERE child_id = ${childId} AND age = ${age}
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (result.length === 0) {
        return NextResponse.json(null);
      }

      return NextResponse.json(result[0]);
    }

    // Otherwise, get all assessments for this child
    const result = await sql`
      SELECT * FROM language_development 
      WHERE child_id = ${childId}
      ORDER BY age ASC, created_at DESC
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching language development:', error);
    return NextResponse.json({ error: 'Failed to fetch language development' }, { status: 500 });
  }
}

// POST - Create or update language development
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, age, answers } = body;

    // Check if language development exists for this child AND age
    const existing = await sql`
      SELECT id FROM language_development 
      WHERE child_id = ${child_id} AND age = ${age}
    `;

    let result;
    if (existing.length > 0) {
      // Update existing for this specific age
      result = await sql`
        UPDATE language_development
        SET answers = ${JSON.stringify(answers)},
            updated_at = NOW()
        WHERE child_id = ${child_id} AND age = ${age}
        RETURNING *
      `;
    } else {
      // Create new for this age
      result = await sql`
        INSERT INTO language_development (child_id, age, answers)
        VALUES (${child_id}, ${age}, ${JSON.stringify(answers)})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving language development:', error);
    return NextResponse.json({ error: 'Failed to save language development' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Calculate DSM criteria
function calculateDSM(answers: any) {
  // Count A criteria (need at least 2 from A1, A2, A3)
  const a1Count = ['a1_1', 'a1_2', 'a1_3'].filter(k => answers[k] === 'Yes').length;
  const a2Count = ['a2_1', 'a2_2', 'a2_3'].filter(k => answers[k] === 'Yes').length;
  const a3Count = ['a3_1', 'a3_2', 'a3_3'].filter(k => answers[k] === 'Yes').length;
  
  const aGroups = [a1Count > 0 ? 1 : 0, a2Count > 0 ? 1 : 0, a3Count > 0 ? 1 : 0].filter(x => x > 0).length;
  const aCriteriaCount = aGroups;

  // Count B criteria (need at least 2 from B1, B2, B3, B4)
  const b1Count = ['b1_1', 'b1_2', 'b1_3'].filter(k => answers[k] === 'Yes').length;
  const b2Count = ['b2_1', 'b2_2'].filter(k => answers[k] === 'Yes').length;
  const b3Count = ['b3_1', 'b3_2'].filter(k => answers[k] === 'Yes').length;
  const b4Count = ['b4_1', 'b4_2'].filter(k => answers[k] === 'Yes').length;
  
  const bGroups = [b1Count > 0 ? 1 : 0, b2Count > 0 ? 1 : 0, b3Count > 0 ? 1 : 0, b4Count > 0 ? 1 : 0].filter(x => x > 0).length;
  const bCriteriaCount = bGroups;

  const cCriteria = answers.c === 'Yes';
  const dCriteria = answers.d === 'Yes';

  const meetsCriteria = aCriteriaCount >= 2 && bCriteriaCount >= 2 && cCriteria && dCriteria;
  
  const interpretation = meetsCriteria 
    ? 'Meets DSM Autism Criteria' 
    : 'Does NOT Meet DSM Criteria';

  return {
    aCriteriaCount,
    bCriteriaCount,
    cCriteria,
    dCriteria,
    meetsCriteria,
    interpretation
  };
}

// GET DSM by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');

    if (!childId) {
      return NextResponse.json({ error: 'child_id is required' }, { status: 400 });
    }

    const result = await sql`
      SELECT * FROM dsm_checklists 
      WHERE child_id = ${childId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching DSM:', error);
    return NextResponse.json({ error: 'Failed to fetch DSM' }, { status: 500 });
  }
}

// POST - Create or update DSM
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, answers } = body;

    const dsmResults = calculateDSM(answers);

    // Check if DSM exists
    const existing = await sql`
      SELECT id FROM dsm_checklists WHERE child_id = ${child_id}
    `;

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await sql`
        UPDATE dsm_checklists
        SET answers = ${JSON.stringify(answers)},
            a_criteria_count = ${dsmResults.aCriteriaCount},
            b_criteria_count = ${dsmResults.bCriteriaCount},
            c_criteria = ${dsmResults.cCriteria},
            d_criteria = ${dsmResults.dCriteria},
            meets_criteria = ${dsmResults.meetsCriteria},
            interpretation = ${dsmResults.interpretation},
            updated_at = NOW()
        WHERE child_id = ${child_id}
        RETURNING *
      `;
    } else {
      // Create new
      result = await sql`
        INSERT INTO dsm_checklists (
          child_id, answers, a_criteria_count, b_criteria_count, 
          c_criteria, d_criteria, meets_criteria, interpretation
        )
        VALUES (
          ${child_id}, ${JSON.stringify(answers)}, ${dsmResults.aCriteriaCount}, 
          ${dsmResults.bCriteriaCount}, ${dsmResults.cCriteria}, ${dsmResults.dCriteria},
          ${dsmResults.meetsCriteria}, ${dsmResults.interpretation}
        )
        RETURNING *
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving DSM:', error);
    return NextResponse.json({ error: 'Failed to save DSM' }, { status: 500 });
  }
}

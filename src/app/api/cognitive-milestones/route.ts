import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET cognitive milestones by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');

    if (!childId) {
      return NextResponse.json({ error: 'child_id is required' }, { status: 400 });
    }

    const result = await sql`
      SELECT * FROM cognitive_milestones 
      WHERE child_id = ${childId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching cognitive milestones:', error);
    return NextResponse.json({ error: 'Failed to fetch cognitive milestones' }, { status: 500 });
  }
}

// POST - Create or update cognitive milestones
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, age, answers } = body;

    // Check if cognitive milestones exists
    const existing = await sql`
      SELECT id FROM cognitive_milestones WHERE child_id = ${child_id}
    `;

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await sql`
        UPDATE cognitive_milestones
        SET age = ${age},
            answers = ${JSON.stringify(answers)},
            updated_at = NOW()
        WHERE child_id = ${child_id}
        RETURNING *
      `;
    } else {
      // Create new
      result = await sql`
        INSERT INTO cognitive_milestones (child_id, age, answers)
        VALUES (${child_id}, ${age}, ${JSON.stringify(answers)})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving cognitive milestones:', error);
    return NextResponse.json({ error: 'Failed to save cognitive milestones' }, { status: 500 });
  }
}

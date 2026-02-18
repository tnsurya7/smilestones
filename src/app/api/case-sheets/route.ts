import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Generate UHID
function generateUHID() {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SM-CHILD-${random}`;
}

// GET case sheet by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');

    if (!childId) {
      return NextResponse.json({ error: 'child_id is required' }, { status: 400 });
    }

    const result = await sql`
      SELECT * FROM case_sheets 
      WHERE child_id = ${childId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching case sheet:', error);
    return NextResponse.json({ error: 'Failed to fetch case sheet' }, { status: 500 });
  }
}

// POST - Create or update case sheet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, data } = body;

    // Check if case sheet exists
    const existing = await sql`
      SELECT id, uhid FROM case_sheets WHERE child_id = ${child_id}
    `;

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await sql`
        UPDATE case_sheets
        SET data = ${JSON.stringify(data)},
            updated_at = NOW()
        WHERE child_id = ${child_id}
        RETURNING *
      `;
    } else {
      // Create new with UHID
      const uhid = generateUHID();
      result = await sql`
        INSERT INTO case_sheets (child_id, data, uhid)
        VALUES (${child_id}, ${JSON.stringify(data)}, ${uhid})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving case sheet:', error);
    return NextResponse.json({ error: 'Failed to save case sheet' }, { status: 500 });
  }
}

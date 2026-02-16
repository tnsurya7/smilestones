import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET all assessments or by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');

    let assessments;
    if (childId) {
      assessments = await sql`
        SELECT * FROM assessments 
        WHERE child_id = ${childId}
        ORDER BY created_at DESC
      `;
    } else {
      assessments = await sql`
        SELECT a.*, c.name as child_name
        FROM assessments a
        LEFT JOIN children c ON a.child_id = c.id
        ORDER BY a.created_at DESC
      `;
    }

    return NextResponse.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}

// POST - Create new assessment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, data, status = 'completed' } = body;

    const result = await sql`
      INSERT INTO assessments (child_id, data, status)
      VALUES (${child_id}, ${JSON.stringify(data)}, ${status})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating assessment:', error);
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 }
    );
  }
}

// PUT - Update assessment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, data, status } = body;

    const result = await sql`
      UPDATE assessments
      SET data = ${JSON.stringify(data)},
          status = ${status},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating assessment:', error);
    return NextResponse.json(
      { error: 'Failed to update assessment' },
      { status: 500 }
    );
  }
}

// DELETE - Delete assessment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    await sql`DELETE FROM assessments WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    return NextResponse.json(
      { error: 'Failed to delete assessment' },
      { status: 500 }
    );
  }
}

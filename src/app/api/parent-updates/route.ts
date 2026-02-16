import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET parent updates by child_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('child_id');

    if (!childId) {
      return NextResponse.json(
        { error: 'child_id is required' },
        { status: 400 }
      );
    }

    const updates = await sql`
      SELECT * FROM parent_updates 
      WHERE child_id = ${childId}
      ORDER BY last_updated DESC
      LIMIT 1
    `;

    if (updates.length === 0) {
      return NextResponse.json({
        achievements: [],
        motivational_messages: [],
        video_links: []
      });
    }

    return NextResponse.json(updates[0]);
  } catch (error) {
    console.error('Error fetching parent updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parent updates' },
      { status: 500 }
    );
  }
}

// POST/PUT - Create or update parent updates
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_id, achievements, motivational_messages, video_links } = body;

    // Check if record exists
    const existing = await sql`
      SELECT id FROM parent_updates WHERE child_id = ${child_id}
    `;

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await sql`
        UPDATE parent_updates
        SET achievements = ${achievements},
            motivational_messages = ${motivational_messages},
            video_links = ${video_links},
            last_updated = NOW()
        WHERE child_id = ${child_id}
        RETURNING *
      `;
    } else {
      // Insert new
      result = await sql`
        INSERT INTO parent_updates (child_id, achievements, motivational_messages, video_links)
        VALUES (${child_id}, ${achievements}, ${motivational_messages}, ${video_links})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving parent updates:', error);
    return NextResponse.json(
      { error: 'Failed to save parent updates' },
      { status: 500 }
    );
  }
}

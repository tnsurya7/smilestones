import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET all therapy registrations
export async function GET() {
  try {
    const registrations = await sql`
      SELECT * FROM therapy_registrations 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching therapy registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch therapy registrations' },
      { status: 500 }
    );
  }
}

// POST - Create new therapy registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { child_name, parent_name, phone, email, therapy_types, payment_mode, referral_code } = body;

    const result = await sql`
      INSERT INTO therapy_registrations (child_name, parent_name, phone, email, therapy_types, payment_mode, referral_code)
      VALUES (${child_name}, ${parent_name}, ${phone}, ${email || null}, ${therapy_types}, ${payment_mode}, ${referral_code})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating therapy registration:', error);
    return NextResponse.json(
      { error: 'Failed to create therapy registration' },
      { status: 500 }
    );
  }
}

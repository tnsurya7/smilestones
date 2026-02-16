import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET all appointments
export async function GET() {
  try {
    const appointments = await sql`
      SELECT * FROM parent_appointments 
      ORDER BY date DESC, time DESC
    `;
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

// POST - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, date, time, service } = body;

    const result = await sql`
      INSERT INTO parent_appointments (phone, date, time, service)
      VALUES (${phone}, ${date}, ${time}, ${service})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

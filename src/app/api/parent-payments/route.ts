import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET all parent payments
export async function GET() {
  try {
    const payments = await sql`
      SELECT * FROM parent_payments 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching parent payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parent payments' },
      { status: 500 }
    );
  }
}

// POST - Create new parent payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { therapies, payment_mode, amount, unique_code } = body;

    const result = await sql`
      INSERT INTO parent_payments (therapies, payment_mode, amount, unique_code)
      VALUES (${JSON.stringify(therapies)}, ${payment_mode}, ${amount}, ${unique_code})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating parent payment:', error);
    return NextResponse.json(
      { error: 'Failed to create parent payment' },
      { status: 500 }
    );
  }
}

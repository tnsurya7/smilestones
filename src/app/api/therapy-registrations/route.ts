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
    console.log('Received therapy registration request:', body);
    
    const { child_name, parent_name, phone, email, therapy_types, payment_mode, referral_code } = body;

    // Validate required fields
    if (!child_name || !parent_name || !phone || !therapy_types || !payment_mode || !referral_code) {
      console.error('Missing required fields:', { child_name, parent_name, phone, therapy_types, payment_mode, referral_code });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure therapy_types is an array
    const therapyTypesArray = Array.isArray(therapy_types) ? therapy_types : [therapy_types];
    
    console.log('Inserting therapy registration with data:', {
      child_name,
      parent_name,
      phone,
      email: email || null,
      therapy_types: therapyTypesArray,
      payment_mode,
      referral_code
    });

    const result = await sql`
      INSERT INTO therapy_registrations (child_name, parent_name, phone, email, therapy_types, payment_mode, referral_code)
      VALUES (${child_name}, ${parent_name}, ${phone}, ${email || null}, ${therapyTypesArray}, ${payment_mode}, ${referral_code})
      RETURNING *
    `;

    console.log('Successfully created therapy registration:', result[0]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating therapy registration:', error);
    console.error('Error details:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Failed to create therapy registration', details: error.message },
      { status: 500 }
    );
  }
}

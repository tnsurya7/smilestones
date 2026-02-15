import { NextResponse } from 'next/server';
import { getDoctors } from '@/lib/neon/database';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // First check super admin from environment variables
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({
        id: '1',
        name: 'Super Admin',
        username: adminUsername,
        role: 'super_admin',
        created_at: new Date().toISOString(),
      });
    }

    // Check database for sub-doctors
    const doctors = await getDoctors();
    const doctor = doctors.find(
      (d) => d.username === username && d.password === password
    );

    if (doctor) {
      return NextResponse.json({
        id: doctor.id,
        name: doctor.name,
        username: doctor.username,
        role: doctor.role,
        created_at: doctor.created_at,
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

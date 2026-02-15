import { NextResponse } from 'next/server';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '@/lib/neon/database';

// Disable caching for mutations, enable for reads
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doctors = await getDoctors();
    return NextResponse.json(doctors, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const doctor = await addDoctor(body);
    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    return NextResponse.json({ error: 'Failed to add doctor' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const doctor = await updateDoctor(id, updates);
    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = await deleteDoctor(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}

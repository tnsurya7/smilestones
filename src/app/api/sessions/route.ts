import { NextResponse } from 'next/server';
import { getSessions, addSession, updateSession, deleteSession, getSessionsByChildId } from '@/lib/neon/database';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');
    
    if (childId) {
      const sessions = await getSessionsByChildId(childId);
      return NextResponse.json(sessions, {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
        },
      });
    }
    
    const sessions = await getSessions();
    return NextResponse.json(sessions, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await addSession(body);
    return NextResponse.json(session);
  } catch (error) {
    console.error('Error adding session:', error);
    return NextResponse.json({ error: 'Failed to add session' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const session = await updateSession(id, updates);
    return NextResponse.json(session);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = await deleteSession(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}

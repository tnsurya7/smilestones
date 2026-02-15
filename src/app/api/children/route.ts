import { NextResponse } from 'next/server';
import { getChildren, addChild, updateChild, deleteChild, getChildById } from '@/lib/neon/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const child = await getChildById(id);
      return NextResponse.json(child);
    }
    
    const children = await getChildren();
    return NextResponse.json(children);
  } catch (error) {
    console.error('Error fetching children:', error);
    return NextResponse.json({ error: 'Failed to fetch children' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const child = await addChild(body);
    return NextResponse.json(child);
  } catch (error) {
    console.error('Error adding child:', error);
    return NextResponse.json({ error: 'Failed to add child' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const child = await updateChild(id, updates);
    return NextResponse.json(child);
  } catch (error) {
    console.error('Error updating child:', error);
    return NextResponse.json({ error: 'Failed to update child' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = await deleteChild(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting child:', error);
    return NextResponse.json({ error: 'Failed to delete child' }, { status: 500 });
  }
}

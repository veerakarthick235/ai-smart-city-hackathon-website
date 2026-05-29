import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const judges = await prisma.judge.findMany({
      where: eventId ? { eventId } : undefined,
      include: { event: { select: { id: true, title: true } } },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(judges);
  } catch (error) {
    console.error('Failed to fetch judges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch judges' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, title, company, bio, photo, linkedin, eventId, order } = body;

    if (!name || !title || !eventId) {
      return NextResponse.json(
        { error: 'Name, title, and eventId are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const judge = await prisma.judge.create({
      data: {
        name,
        title,
        company: company || null,
        bio: bio || null,
        photo: photo || null,
        linkedin: linkedin || null,
        eventId,
        order: order ?? 0,
      },
    });

    return NextResponse.json(judge, { status: 201 });
  } catch (error) {
    console.error('Failed to create judge:', error);
    return NextResponse.json(
      { error: 'Failed to create judge' },
      { status: 500 }
    );
  }
}

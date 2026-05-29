import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const sponsors = await prisma.sponsor.findMany({
      where: eventId ? { eventId } : undefined,
      include: { event: { select: { id: true, title: true } } },
    });

    return NextResponse.json(sponsors);
  } catch (error) {
    console.error('Failed to fetch sponsors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsors' },
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
    const { name, logo, url, tier, eventId } = body;

    if (!name || !eventId) {
      return NextResponse.json(
        { error: 'Name and eventId are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const sponsor = await prisma.sponsor.create({
      data: {
        name,
        logo: logo || null,
        url: url || null,
        tier: tier || 'partner',
        eventId,
      },
    });

    return NextResponse.json(sponsor, { status: 201 });
  } catch (error) {
    console.error('Failed to create sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to create sponsor' },
      { status: 500 }
    );
  }
}

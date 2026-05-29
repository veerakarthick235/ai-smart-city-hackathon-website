import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sponsor = await prisma.sponsor.findUnique({
      where: { id },
      include: { event: { select: { id: true, title: true } } },
    });

    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    return NextResponse.json(sponsor);
  } catch (error) {
    console.error('Failed to fetch sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, logo, url, tier, eventId } = body;

    const existing = await prisma.sponsor.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    if (eventId) {
      const event = await prisma.event.findUnique({ where: { id: eventId } });
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
    }

    const sponsor = await prisma.sponsor.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(logo !== undefined && { logo }),
        ...(url !== undefined && { url }),
        ...(tier !== undefined && { tier }),
        ...(eventId !== undefined && { eventId }),
      },
    });

    return NextResponse.json(sponsor);
  } catch (error) {
    console.error('Failed to update sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to update sponsor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.sponsor.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    await prisma.sponsor.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Sponsor deleted' });
  } catch (error) {
    console.error('Failed to delete sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to delete sponsor' },
      { status: 500 }
    );
  }
}

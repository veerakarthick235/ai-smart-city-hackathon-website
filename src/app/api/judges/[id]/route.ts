import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const judge = await prisma.judge.findUnique({
      where: { id },
      include: { event: { select: { id: true, title: true } } },
    });

    if (!judge) {
      return NextResponse.json({ error: 'Judge not found' }, { status: 404 });
    }

    return NextResponse.json(judge);
  } catch (error) {
    console.error('Failed to fetch judge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch judge' },
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
    const { name, title, company, bio, photo, linkedin, eventId, order } = body;

    const existing = await prisma.judge.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Judge not found' }, { status: 404 });
    }

    if (eventId) {
      const event = await prisma.event.findUnique({ where: { id: eventId } });
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
    }

    const judge = await prisma.judge.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(title !== undefined && { title }),
        ...(company !== undefined && { company }),
        ...(bio !== undefined && { bio }),
        ...(photo !== undefined && { photo }),
        ...(linkedin !== undefined && { linkedin }),
        ...(eventId !== undefined && { eventId }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(judge);
  } catch (error) {
    console.error('Failed to update judge:', error);
    return NextResponse.json(
      { error: 'Failed to update judge' },
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

    const existing = await prisma.judge.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Judge not found' }, { status: 404 });
    }

    await prisma.judge.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Judge deleted' });
  } catch (error) {
    console.error('Failed to delete judge:', error);
    return NextResponse.json(
      { error: 'Failed to delete judge' },
      { status: 500 }
    );
  }
}

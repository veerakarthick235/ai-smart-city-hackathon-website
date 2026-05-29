import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const winner = await prisma.winner.findUnique({
      where: { id },
      include: { event: { select: { id: true, title: true } } },
    });

    if (!winner) {
      return NextResponse.json({ error: 'Winner not found' }, { status: 404 });
    }

    return NextResponse.json(winner);
  } catch (error) {
    console.error('Failed to fetch winner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch winner' },
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
    const { projectName, teamName, members, description, category, github, demoVideo, screenshot, feedback, eventId } = body;

    const existing = await prisma.winner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Winner not found' }, { status: 404 });
    }

    if (eventId) {
      const event = await prisma.event.findUnique({ where: { id: eventId } });
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
    }

    const winner = await prisma.winner.update({
      where: { id },
      data: {
        ...(projectName !== undefined && { projectName }),
        ...(teamName !== undefined && { teamName }),
        ...(members !== undefined && {
          members: typeof members === 'object' ? JSON.stringify(members) : members,
        }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(github !== undefined && { github }),
        ...(demoVideo !== undefined && { demoVideo }),
        ...(screenshot !== undefined && { screenshot }),
        ...(feedback !== undefined && { feedback }),
        ...(eventId !== undefined && { eventId }),
      },
    });

    return NextResponse.json(winner);
  } catch (error) {
    console.error('Failed to update winner:', error);
    return NextResponse.json(
      { error: 'Failed to update winner' },
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

    const existing = await prisma.winner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Winner not found' }, { status: 404 });
    }

    await prisma.winner.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Winner deleted' });
  } catch (error) {
    console.error('Failed to delete winner:', error);
    return NextResponse.json(
      { error: 'Failed to delete winner' },
      { status: 500 }
    );
  }
}

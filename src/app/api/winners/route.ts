import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const category = searchParams.get('category');

    const where: Record<string, string> = {};
    if (eventId) where.eventId = eventId;
    if (category) where.category = category;

    const winners = await prisma.winner.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      include: { event: { select: { id: true, title: true } } },
    });

    return NextResponse.json(winners);
  } catch (error) {
    console.error('Failed to fetch winners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch winners' },
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
    const { projectName, teamName, members, description, category, github, demoVideo, screenshot, feedback, eventId } = body;

    if (!projectName || !teamName || !category || !eventId) {
      return NextResponse.json(
        { error: 'projectName, teamName, category, and eventId are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const winner = await prisma.winner.create({
      data: {
        projectName,
        teamName,
        members: typeof members === 'object' ? JSON.stringify(members) : (members || '[]'),
        description: description || null,
        category,
        github: github || null,
        demoVideo: demoVideo || null,
        screenshot: screenshot || null,
        feedback: feedback || null,
        eventId,
      },
    });

    return NextResponse.json(winner, { status: 201 });
  } catch (error) {
    console.error('Failed to create winner:', error);
    return NextResponse.json(
      { error: 'Failed to create winner' },
      { status: 500 }
    );
  }
}

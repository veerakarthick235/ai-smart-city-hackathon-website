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

    const projects = await prisma.project.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      include: { event: { select: { id: true, title: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
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
    const { name, team, members, techStack, description, category, demoLink, github, screenshot, eventId } = body;

    if (!name || !team || !category || !eventId) {
      return NextResponse.json(
        { error: 'Name, team, category, and eventId are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        team,
        members: typeof members === 'object' ? JSON.stringify(members) : (members || '[]'),
        techStack: typeof techStack === 'object' ? JSON.stringify(techStack) : (techStack || '[]'),
        description: description || null,
        category,
        demoLink: demoLink || null,
        github: github || null,
        screenshot: screenshot || null,
        eventId,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

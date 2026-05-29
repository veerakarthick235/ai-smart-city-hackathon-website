import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: {
            judges: true,
            participants: true,
            projects: true,
            winners: true,
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
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
    const { title, slug, tagline, description, startDate, endDate, location, status, bannerImage } = body;

    if (!title || !slug || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Title, slug, startDate, and endDate are required' },
        { status: 400 }
      );
    }

    const existingEvent = await prisma.event.findUnique({ where: { slug } });
    if (existingEvent) {
      return NextResponse.json(
        { error: 'An event with this slug already exists' },
        { status: 409 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        tagline: tagline || null,
        description: description || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location: location || 'Global Online',
        status: status || 'upcoming',
        bannerImage: bannerImage || null,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

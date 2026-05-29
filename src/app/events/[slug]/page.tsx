import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EventPage from './EventPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return { title: 'Event Not Found' };
  return {
    title: event.title,
    description: event.tagline || event.description || '',
    openGraph: {
      title: event.title,
      description: event.tagline || '',
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      judges: { orderBy: { order: 'asc' } },
      themes: { orderBy: { order: 'asc' } },
      prizes: { orderBy: { order: 'asc' } },
      timelineItems: { orderBy: { order: 'asc' } },
      rules: { orderBy: { order: 'asc' } },
      teamMembers: { orderBy: { order: 'asc' } },
      testimonials: true,
      winners: true,
      projects: true,
      sponsors: true,
    },
  });

  if (!event) notFound();

  const serializedEvent = {
    ...event,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
    timelineItems: event.timelineItems.map((item) => ({
      ...item,
      date: item.date?.toISOString() || null,
    })),
    projects: event.projects.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    })),
  };

  return <EventPage event={serializedEvent} />;
}

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JudgeRecognition from './JudgeRecognition';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return { title: 'Judges Not Found' };
  return {
    title: `Judge Recognition | ${event.title}`,
  };
}

export default async function JudgesPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      judges: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!event) notFound();

  return <JudgeRecognition eventTitle={event.title} judges={event.judges} />;
}

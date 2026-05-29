import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WinnersShowcase from './WinnersShowcase';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return { title: 'Winners Not Found' };
  return {
    title: `Winners | ${event.title}`,
  };
}

export default async function WinnersPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      winners: true,
    },
  });

  if (!event) notFound();

  return <WinnersShowcase eventTitle={event.title} winners={event.winners} />;
}

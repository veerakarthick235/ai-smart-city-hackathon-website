import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import HallOfFame from './HallOfFame';

export const metadata: Metadata = {
  title: 'Hall of Fame | Innovation Hacks',
  description: 'Celebrating innovation across all Innovation Hacks events. Meet the winners who built the future.',
};

export default async function HallOfFamePage() {
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({
      where: {
        winners: { some: {} } // Only get events that have winners
      },
      include: {
        winners: {
          orderBy: { category: 'asc' }
        }
      },
      orderBy: {
        endDate: 'desc'
      }
    });
  } catch (error) {
    console.error("Database connection failed. Showing empty state.", error);
  }

  return <HallOfFame events={events} />;
}

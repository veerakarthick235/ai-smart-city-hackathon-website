import { prisma } from '@/lib/prisma';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await prisma.event.findMany({ select: { slug: true, updatedAt: true } });

  const eventPages = events.flatMap((event) => [
    {
      url: `https://innovationhacks.dev/events/${event.slug}`,
      lastModified: event.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `https://innovationhacks.dev/events/${event.slug}/winners`,
      lastModified: event.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `https://innovationhacks.dev/events/${event.slug}/projects`,
      lastModified: event.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `https://innovationhacks.dev/events/${event.slug}/judges`,
      lastModified: event.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [
    {
      url: 'https://innovationhacks.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://innovationhacks.dev/hall-of-fame',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://innovationhacks.dev/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://innovationhacks.dev/verify',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    ...eventPages,
  ];
}

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectGallery from './ProjectGallery';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return { title: 'Projects Not Found' };
  return {
    title: `Project Gallery | ${event.title}`,
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      projects: {
        orderBy: {
          createdAt: 'desc'
        }
      },
    },
  });

  if (!event) notFound();

  const serializedProjects = event.projects.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return <ProjectGallery eventTitle={event.title} projects={serializedProjects} />;
}

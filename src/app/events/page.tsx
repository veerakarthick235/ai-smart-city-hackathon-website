import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Events | Innovation Hacks',
  description: 'Explore upcoming and past hackathons organized by Innovation Hacks.',
};

export default async function EventsPage() {
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  } catch (error) {
    console.error('Database connection failed. Showing empty state.', error);
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            All <span className="gradient-text">Events</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover and join the world's most innovative hackathons.
          </p>
        </div>

        {events.length === 0 ? (
          <GlassCard>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No events found. Check back later!</p>
            </div>
          </GlassCard>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {events.map((event) => (
              <GlassCard key={event.id} hover>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: event.status === 'active' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                        color: event.status === 'active' ? 'var(--primary)' : 'var(--accent)',
                        border: `1px solid ${event.status === 'active' ? 'var(--primary)' : 'var(--accent)'}`,
                      }}
                    >
                      {event.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {event.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {event.tagline || event.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <Calendar size={16} />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

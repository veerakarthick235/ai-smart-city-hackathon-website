import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const certificates = await prisma.certificate.findMany({
      where: eventId ? { eventId } : undefined,
      include: { event: { select: { id: true, title: true } } },
      orderBy: { issueDate: 'desc' },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Failed to fetch certificates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
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
    const { name, role, eventId, issueDate, status } = body;

    if (!name || !role || !eventId) {
      return NextResponse.json(
        { error: 'Name, role, and eventId are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const year = new Date().getFullYear();

    const lastCert = await prisma.certificate.findFirst({
      where: {
        certId: { startsWith: `IH-${year}-` },
      },
      orderBy: { certId: 'desc' },
    });

    let nextSeq = 1;
    if (lastCert) {
      const parts = lastCert.certId.split('-');
      const lastSeq = parseInt(parts[2], 10);
      if (!isNaN(lastSeq)) {
        nextSeq = lastSeq + 1;
      }
    }

    const certId = `IH-${year}-${String(nextSeq).padStart(4, '0')}`;

    const certificate = await prisma.certificate.create({
      data: {
        certId,
        name,
        role,
        eventId,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        status: status || 'valid',
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('Failed to create certificate:', error);
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}

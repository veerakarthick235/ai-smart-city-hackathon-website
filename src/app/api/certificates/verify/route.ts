import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const certId = searchParams.get('certId');

    if (!certId) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { certId },
      include: {
        event: {
          select: { title: true }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

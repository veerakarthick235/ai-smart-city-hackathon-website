import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'innovation-hacks-admin-2026';

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === ADMIN_SECRET;
}

export function getAdminSecret(): string {
  return ADMIN_SECRET;
}

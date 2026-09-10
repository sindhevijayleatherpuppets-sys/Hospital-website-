'use server';

import { clearSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function logoutAction() {
  await clearSession();
  revalidatePath('/', 'layout');
  redirect('/');
}

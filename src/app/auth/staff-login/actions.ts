'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { createSession, verifyPassword, hashPassword } from '@/lib/auth';

export async function loginStaff(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!email || !password) {
    redirect('/auth/staff-login?error=MissingFields');
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (user && (user.role === 'DOCTOR' || user.role === 'RECEPTIONIST')) {
      const isValid = await verifyPassword(password, user.password);
      if (isValid) {
        // Seamlessly upgrade legacy plain-text password to hash
        if (!user.password.startsWith('scrypt:')) {
          const newHash = await hashPassword(password);
          await prisma.user.update({
            where: { id: user.id },
            data: { password: newHash }
          }).catch(() => {});
        }

        await createSession(user.id, user.role);
        if (user.role === 'DOCTOR') {
          redirect('/dashboard/doctor');
        } else {
          redirect('/dashboard/receptionist');
        }
      }
    }

    redirect('/auth/staff-login?error=InvalidStaffCredentials');
  } catch (err: any) {
    if (err?.message === 'NEXT_REDIRECT' || err?.digest?.startsWith?.('NEXT_REDIRECT')) {
      throw err;
    }
    console.error('Database/Server error in loginStaff:', err);
    redirect('/auth/staff-login?error=DatabaseError');
  }
}

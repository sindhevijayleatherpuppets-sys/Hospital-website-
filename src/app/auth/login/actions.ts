'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { createSession, verifyPassword, hashPassword } from '@/lib/auth';

export async function loginPatient(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!email || !password) {
    redirect('/auth/login?error=MissingFields');
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.role === 'PATIENT') {
    const isValid = await verifyPassword(password, user.password);
    if (isValid) {
      // If user had a legacy plain text password, seamlessly upgrade to salted hash
      if (!user.password.startsWith('scrypt:')) {
        const newHash = await hashPassword(password);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: newHash }
        }).catch(() => {});
      }

      await createSession(user.id, user.role);
      redirect('/dashboard/patient');
    }
  }

  redirect('/auth/login?error=InvalidCredentials');
}

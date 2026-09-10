'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { createSession, hashPassword } from '@/lib/auth';

export async function signupPatient(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    redirect('/auth/signup?error=MissingFields');
  }

  if (password.length < 6) {
    redirect('/auth/signup?error=PasswordTooShort');
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      redirect('/auth/signup?error=EmailTaken');
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'PATIENT'
      }
    });

    await createSession(user.id, user.role);
    redirect('/dashboard/patient');
  } catch (err) {
    // If Next.js redirect was thrown, re-throw it so navigation works
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
      throw err;
    }
    redirect('/auth/signup?error=EmailTaken');
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const ALLOWED_STATUSES = ['PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED'] as const;
const ALLOWED_PAYMENT_STATUSES = ['PENDING', 'PAID_ONLINE', 'PAY_AT_HOSPITAL', 'PAID_AT_COUNTER'] as const;

export async function updateAppointmentStatus(formData: FormData): Promise<void> {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'RECEPTIONIST' && session.role !== 'DOCTOR')) {
      console.error('Unauthorized: Staff access required');
      return;
    }

    const appointmentId = formData.get('appointmentId') as string;
    const status = formData.get('status') as string;

    if (!appointmentId || !status) {
      console.error('Missing required parameters');
      return;
    }

    if (!ALLOWED_STATUSES.includes(status as typeof ALLOWED_STATUSES[number])) {
      console.error('Invalid appointment status:', status);
      return;
    }

    const exists = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!exists) {
      console.error('Appointment not found:', appointmentId);
      return;
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status }
    });

    revalidatePath('/dashboard/receptionist');
    revalidatePath('/dashboard/doctor');
    revalidatePath('/dashboard/patient');
  } catch (err) {
    console.error('Failed to update appointment status:', err);
  }
}

export async function updatePaymentStatus(formData: FormData): Promise<void> {
  try {
    const session = await getSession();
    if (!session || session.role !== 'RECEPTIONIST') {
      console.error('Unauthorized: Receptionist access required');
      return;
    }

    const appointmentId = formData.get('appointmentId') as string;
    const paymentStatus = formData.get('paymentStatus') as string;

    if (!appointmentId || !paymentStatus) {
      console.error('Missing required parameters');
      return;
    }

    if (!ALLOWED_PAYMENT_STATUSES.includes(paymentStatus as typeof ALLOWED_PAYMENT_STATUSES[number])) {
      console.error('Invalid payment status:', paymentStatus);
      return;
    }

    const exists = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!exists) {
      console.error('Appointment not found:', appointmentId);
      return;
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { paymentStatus }
    });

    revalidatePath('/dashboard/receptionist');
    revalidatePath('/dashboard/doctor');
    revalidatePath('/dashboard/patient');
  } catch (err) {
    console.error('Failed to update payment status:', err);
  }
}

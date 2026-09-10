'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function bookAppointment(formData: FormData) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'PATIENT') {
      return { error: 'Authentication required. Please log in as a patient.' };
    }

    const dateStr = (formData.get('date') as string)?.trim();
    const timeStr = (formData.get('time') as string)?.trim();
    const rawDisease = (formData.get('disease') as string)?.trim();
    const rawPaymentMethod = (formData.get('paymentMethod') as string)?.trim();
    const rawTransactionId = (formData.get('transactionId') as string)?.trim();

    if (!dateStr || !timeStr) {
      return { error: 'Please select both consultation date and time slot.' };
    }

    // Validate date format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr) || !/^\d{2}:\d{2}$/.test(timeStr)) {
      return { error: 'Invalid date or time slot format.' };
    }

    const date = new Date(`${dateStr}T${timeStr}:00`);
    if (isNaN(date.getTime())) {
      return { error: 'Invalid appointment date selected.' };
    }

    // Ensure appointment is not in the past (allowing a 5-minute clock skew buffer)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (date < fiveMinutesAgo) {
      return { error: 'Appointment date and time must be in the future.' };
    }

    const paymentMethod = rawPaymentMethod === 'UPI_QR' ? 'UPI_QR' : 'HOSPITAL_COUNTER';
    const paymentStatus = paymentMethod === 'UPI_QR' ? 'PAID_ONLINE' : 'PAY_AT_HOSPITAL';
    const consultationFee = 500.0;
    const disease = rawDisease ? rawDisease.slice(0, 250) : 'General Ayurvedic Consultation';
    const transactionId = paymentMethod === 'UPI_QR' && rawTransactionId ? rawTransactionId.slice(0, 60) : null;

    await prisma.appointment.create({
      data: {
        date,
        status: 'PENDING',
        consultationFee,
        paymentStatus,
        paymentMethod,
        transactionId,
        disease,
        patientId: session.userId,
      }
    });

    revalidatePath('/dashboard/patient');
    revalidatePath('/dashboard/receptionist');
    revalidatePath('/dashboard/doctor');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error booking appointment:', err);
    return { error: err instanceof Error ? err.message : 'Failed to book appointment' };
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function prescribe(formData: FormData): Promise<void> {
  try {
    const session = await getSession();
    if (!session || session.role !== 'DOCTOR') {
      console.error('Unauthorized: Doctor credentials required');
      return;
    }

    const appointmentId = formData.get('appointmentId') as string;
    const disease = (formData.get('disease') as string)?.trim() || 'Ayurvedic Consultation';
    const medicines = (formData.get('medicines') as string)?.trim();
    const dosage = (formData.get('dosage') as string)?.trim();
    const dietAdvice = (formData.get('dietAdvice') as string)?.trim();
    const text = (formData.get('text') as string)?.trim();
    
    if (!appointmentId || !medicines) {
      console.error('Appointment ID and prescribed medicines are required.');
      return;
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      console.error('Appointment not found:', appointmentId);
      return;
    }

    if (appointment.status !== 'APPROVED' && appointment.status !== 'COMPLETED') {
      console.error('Prescriptions can only be issued for approved or active appointments.');
      return;
    }

    const defaultRemark = 'Prescription confirmed and issued online by Chief Physician Dr. Krishna Murthy.';

    await prisma.prescription.upsert({
      where: { appointmentId },
      update: {
        disease,
        medicines,
        dosage,
        dietAdvice,
        text: text || defaultRemark
      },
      create: {
        appointmentId,
        disease,
        medicines,
        dosage,
        dietAdvice,
        text: text || defaultRemark
      }
    });

    // Ensure appointment is marked completed
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'COMPLETED' }
    });

    revalidatePath('/dashboard/doctor');
    revalidatePath('/dashboard/patient');
    revalidatePath('/dashboard/receptionist');
  } catch (err) {
    console.error('Prescription issue error:', err);
  }
}

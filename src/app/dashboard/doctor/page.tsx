import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';
import prisma from '@/lib/prisma';
import { updateAppointmentStatus } from '../receptionist/actions';
import { prescribe } from './actions';

export default async function DoctorDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'DOCTOR') {
    redirect('/auth/staff-login');
  }

  // Doctor ONLY sees patients approved by the receptionist (or already completed)
  const appointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: ['APPROVED', 'COMPLETED']
      }
    },
    orderBy: { date: 'asc' },
    include: { patient: true, prescription: true }
  });

  const approvedCount = appointments.filter(a => a.status === 'APPROVED').length;
  const completedCount = appointments.filter(a => a.status === 'COMPLETED').length;
  const prescriptionsCount = appointments.filter(a => a.prescription !== null).length;

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
      {/* Top Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-2xl)',
        paddingBottom: 'var(--spacing-md)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <img 
            src="/images/doctor-image.png" 
            alt="Dr. Krishna Murthy" 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid var(--color-primary)' 
            }} 
          />
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Dr. Krishna Murthy • Doctor Portal</h1>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Chief Physician • Dhanvanthari Ayurveda Hospital &amp; Panchakarma Centre
            </span>
          </div>
        </div>

        <form action={logoutAction}>
          <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1.2rem' }}>
            Logout
          </button>
        </form>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-2xl)' }}>
        <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Approved & Ready</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-primary)', display: 'block', marginTop: '4px' }}>
            {approvedCount}
          </strong>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Completed Cases</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-success)', display: 'block', marginTop: '4px' }}>
            {completedCount}
          </strong>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Prescriptions Issued</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', display: 'block', marginTop: '4px' }}>
            {prescriptionsCount}
          </strong>
        </div>
      </div>

      {/* Main Consultations Queue */}
      <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-2xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>
            📋 Approved Consultations Queue
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', background: 'var(--color-accent)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
            Showing Receptionist-Approved Patients Only
          </span>
        </div>

        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              No approved patients in queue. When the receptionist approves incoming patient requests, they will automatically appear here for consultation.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            {appointments.map(apt => (
              <div key={apt.id} style={{ 
                padding: 'var(--spacing-lg)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-background)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                  <div>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', display: 'block' }}>
                      {apt.patient.name}
                    </strong>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block' }}>
                      Email: {apt.patient.email} • Scheduled: {new Date(apt.date).toLocaleDateString()} at {new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 500, marginTop: '2px', display: 'block' }}>
                      🩺 Reported Concern: {apt.disease || 'General Consultation'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      backgroundColor: apt.status === 'APPROVED' ? 'var(--color-primary-light)' : 
                                       apt.status === 'COMPLETED' ? 'var(--color-success)' : 'var(--color-error)',
                      color: 'white'
                    }}>
                      {apt.status === 'APPROVED' ? '✓ Approved by Reception' : apt.status}
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.8rem', 
                        fontWeight: 600,
                        backgroundColor: apt.paymentStatus === 'PAID_ONLINE' || apt.paymentStatus === 'PAID_AT_COUNTER' ? 'var(--color-primary)' : 'var(--color-accent)',
                        color: apt.paymentStatus === 'PAID_ONLINE' || apt.paymentStatus === 'PAID_AT_COUNTER' ? '#ffffff' : 'var(--color-primary-dark)',
                        border: '1px solid var(--color-border)'
                      }}>
                        {apt.paymentStatus === 'PAID_ONLINE' ? '✓ Paid Online (₹500)' : 
                         apt.paymentStatus === 'PAID_AT_COUNTER' ? '✓ Paid at Counter' : '🏥 Pay on Arrival'}
                      </span>
                      {apt.transactionId && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                          UTR: {apt.transactionId}
                        </span>
                      )}
                    </div>

                    {apt.status === 'APPROVED' && (
                      <form action={updateAppointmentStatus}>
                        <input type="hidden" name="appointmentId" value={apt.id} />
                        <input type="hidden" name="status" value="COMPLETED" />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.35rem 0.9rem', fontSize: '0.85rem' }}>
                          Mark Completed
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Prescription Section */}
                {!apt.prescription ? (
                  <div style={{ 
                    padding: 'var(--spacing-lg)', 
                    backgroundColor: 'var(--color-surface)', 
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--spacing-sm)' }}>
                      ✍️ Issue Digital Prescription for {apt.patient.name}
                    </h4>

                    <form action={prescribe} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      <input type="hidden" name="appointmentId" value={apt.id} />

                      <div className="form-group" style={{ marginBottom: '6px' }}>
                        <label className="form-label" style={{ fontSize: '0.85rem' }}>Clinical Diagnosis / Ayurvedic Disease Category</label>
                        <input 
                          className="form-input" 
                          name="disease" 
                          placeholder="e.g. Vata-Pitta Imbalance, Amavata, Sandhigata Vata..." 
                          defaultValue={apt.disease || ''}
                          required 
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: '6px' }}>
                        <label className="form-label" style={{ fontSize: '0.85rem' }}>Prescribed Herbal Formulations & Medicines</label>
                        <textarea 
                          className="form-textarea" 
                          name="medicines" 
                          placeholder="e.g. 1. Yogaraja Guggulu - 1 tablet (Twice daily after food)&#10;2. Dhanvantharam Kashayam - 15ml with warm water"
                          required 
                          rows={3}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-sm)' }}>
                        <div className="form-group" style={{ marginBottom: '6px' }}>
                          <label className="form-label" style={{ fontSize: '0.85rem' }}>Dosage Schedule & Duration</label>
                          <input 
                            className="form-input" 
                            name="dosage" 
                            placeholder="e.g. Continue strictly for 14 days, review on day 15" 
                            required
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: '6px' }}>
                          <label className="form-label" style={{ fontSize: '0.85rem' }}>Dietary Guidelines (Pathya / Apathya)</label>
                          <input 
                            className="form-input" 
                            name="dietAdvice" 
                            placeholder="e.g. Avoid cold/sour foods, prefer warm mung water" 
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '8px' }}>
                        <label className="form-label" style={{ fontSize: '0.85rem' }}>Doctor&apos;s Advice & General Notes</label>
                        <input 
                          className="form-input" 
                          name="text" 
                          placeholder="e.g. Daily light walking and oil massage recommended." 
                        />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.5rem 1.5rem' }}>
                        Send Digital Prescription to Patient Online →
                      </button>
                    </form>
                  </div>
                ) : (
                  <div style={{ 
                    padding: 'var(--spacing-md)', 
                    backgroundColor: '#ffffff', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: 'var(--color-primary-dark)' }}>
                        ✓ Official Prescription Issued ({apt.prescription.disease || 'Ayurvedic Treatment'})
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                        Visible to Patient
                      </span>
                    </div>

                    <pre style={{ 
                      whiteSpace: 'pre-wrap', 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '0.85rem', 
                      backgroundColor: 'var(--color-background)', 
                      padding: 'var(--spacing-sm)', 
                      borderRadius: 'var(--radius-sm)',
                      margin: '6px 0',
                      color: 'var(--color-text-main)'
                    }}>
                      {apt.prescription.medicines}
                    </pre>

                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      <strong>Dosage:</strong> {apt.prescription.dosage || 'Standard'} • <strong>Diet:</strong> {apt.prescription.dietAdvice || 'Normal ayurvedic diet'}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

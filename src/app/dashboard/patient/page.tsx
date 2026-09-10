import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';
import prisma from '@/lib/prisma';
import BookingForm from '@/components/BookingForm';

export default async function PatientDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'PATIENT') {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      appointments: {
        orderBy: { date: 'desc' },
        include: { prescription: true }
      }
    }
  });

  if (!user) {
    redirect('/auth/login');
  }

  const allPrescriptions = user.appointments
    .filter(apt => apt.prescription !== null)
    .map(apt => ({
      appointmentDate: apt.date,
      disease: apt.disease,
      prescription: apt.prescription!
    }));

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
      {/* Dashboard Top Header */}
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
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 600
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Welcome, {user.name}</h1>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Patient Portal • {user.email}
            </span>
          </div>
        </div>

        <form action={logoutAction}>
          <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1.2rem' }}>
            Logout
          </button>
        </form>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        
        {/* Left Column: Interactive Booking Form with Payment Flow */}
        <div>
          <BookingForm />
        </div>

        {/* Right Column: Appointments & Digital Prescriptions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          
          {/* Appointments History Card */}
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary-dark)' }}>
              Your Appointments
            </h2>

            {user.appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                  No appointments booked yet. Use the booking form on the left to schedule a consultation.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {user.appointments.map(apt => (
                  <div key={apt.id} style={{ 
                    padding: 'var(--spacing-md)', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-background)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-xs)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                        🗓️ {new Date(apt.date).toLocaleDateString()} at {new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </strong>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {/* Status Badge */}
                        <span style={{ 
                          padding: '3px 8px', 
                          borderRadius: '12px', 
                          fontSize: '0.75rem', 
                          fontWeight: 600,
                          backgroundColor: apt.status === 'PENDING' ? 'var(--color-warning)' : 
                                           apt.status === 'APPROVED' ? 'var(--color-primary-light)' : 
                                           apt.status === 'COMPLETED' ? 'var(--color-success)' : 'var(--color-error)',
                          color: 'white'
                        }}>
                          {apt.status}
                        </span>

                        {/* Payment Badge */}
                        <span style={{ 
                          padding: '3px 8px', 
                          borderRadius: '12px', 
                          fontSize: '0.75rem', 
                          fontWeight: 600,
                          backgroundColor: apt.paymentStatus === 'PAID_ONLINE' ? 'var(--color-primary)' : 'var(--color-accent)',
                          color: apt.paymentStatus === 'PAID_ONLINE' ? '#ffffff' : 'var(--color-primary-dark)',
                          border: '1px solid var(--color-border)'
                        }}>
                          {apt.paymentStatus === 'PAID_ONLINE' 
                            ? `✓ Paid Online (QR${apt.transactionId ? ` • Ref: ${apt.transactionId}` : ''})` 
                            : '🏥 Pay on Arrival'}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      <strong>Concern:</strong> {apt.disease || 'General Consultation'} • Fee: ₹{(apt.consultationFee ?? 500).toFixed(2)}
                      {apt.transactionId && (
                        <span style={{ marginLeft: '8px', color: 'var(--color-primary)' }}>
                          • <strong>Txn Ref:</strong> {apt.transactionId}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dedicated Prescriptions Card */}
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                📜 My Digital Prescriptions
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Issued by Chief Physician
              </span>
            </div>

            {allPrescriptions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                  No prescriptions issued yet. After your consultation with Dr. Krishna Murthy, your official prescription and herbal dosage guide will appear here.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {allPrescriptions.map((item, idx) => (
                  <div key={idx} style={{ 
                    border: '2px solid var(--color-border)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: 'var(--spacing-lg)',
                    backgroundColor: '#ffffff',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', display: 'block' }}>
                          Rx: {item.prescription.disease || 'Ayurvedic Treatment Plan'}
                        </strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                          Consultation Date: {new Date(item.appointmentDate).toLocaleDateString()}
                        </span>
                      </div>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: 'var(--radius-sm)', 
                        backgroundColor: 'var(--color-accent)', 
                        color: 'var(--color-primary-dark)', 
                        fontWeight: 600, 
                        fontSize: '0.8rem',
                        height: 'fit-content'
                      }}>
                        Verified Doctor Rx
                      </span>
                    </div>

                    {item.prescription.medicines && (
                      <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                          🌿 Prescribed Formulations & Medicines:
                        </strong>
                        <pre style={{ 
                          whiteSpace: 'pre-wrap', 
                          fontFamily: 'var(--font-body)', 
                          fontSize: '0.9rem', 
                          backgroundColor: 'var(--color-background)', 
                          padding: 'var(--spacing-md)', 
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--color-text-main)',
                          margin: 0
                        }}>
                          {item.prescription.medicines}
                        </pre>
                      </div>
                    )}

                    {item.prescription.dosage && (
                      <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                          ⏰ Dosage & Instructions:
                        </strong>
                        <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--color-text-main)' }}>
                          {item.prescription.dosage}
                        </p>
                      </div>
                    )}

                    {item.prescription.dietAdvice && (
                      <div style={{ marginBottom: 'var(--spacing-md)', backgroundColor: 'var(--color-accent)', padding: 'var(--spacing-sm) var(--spacing-md)', borderRadius: 'var(--radius-sm)' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '2px' }}>
                          🥗 Dietary Guidance (Pathya / Apathya):
                        </strong>
                        <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--color-text-main)' }}>
                          {item.prescription.dietAdvice}
                        </p>
                      </div>
                    )}

                    {item.prescription.text && (
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                          Doctor&apos;s Clinical Remarks:
                        </strong>
                        <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--color-text-main)' }}>
                          {item.prescription.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

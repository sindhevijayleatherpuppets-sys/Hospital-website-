import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';
import prisma from '@/lib/prisma';
import { updateAppointmentStatus, updatePaymentStatus } from './actions';

export default async function ReceptionistDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'RECEPTIONIST') {
    redirect('/auth/staff-login');
  }

  const allAppointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
    include: { patient: true }
  });

  const activeAppointments = allAppointments.filter(a => a.status !== 'CANCELLED');
  const cancelledAppointments = allAppointments.filter(a => a.status === 'CANCELLED');

  const totalPatients = await prisma.user.count({ where: { role: 'PATIENT' } });
  const pendingApts = allAppointments.filter(a => a.status === 'PENDING').length;
  const approvedApts = allAppointments.filter(a => a.status === 'APPROVED').length;
  const cancelledCount = cancelledAppointments.length;

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
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Front Desk & Reception Portal</h1>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Dhanvanthari Ayurveda Hospital • Patient Approval & Fee Management
          </span>
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
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Awaiting Approval</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-warning)', display: 'block', marginTop: '4px' }}>
            {pendingApts}
          </strong>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Approved for Doctor</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-primary)', display: 'block', marginTop: '4px' }}>
            {approvedApts}
          </strong>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Cancelled Queue</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-error)', display: 'block', marginTop: '4px' }}>
            {cancelledCount}
          </strong>
        </div>
        <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Patients</span>
          <strong style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', display: 'block', marginTop: '4px' }}>
            {totalPatients}
          </strong>
        </div>
      </div>

      {/* Active & Pending Appointments Queue */}
      <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-2xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>
            Active Appointments & Approval Desk
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Approving sends patient to Doctor queue
          </span>
        </div>
        
        {activeAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>No active or pending appointments to process.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {activeAppointments.map(apt => (
              <div key={apt.id} style={{ 
                padding: 'var(--spacing-md) var(--spacing-lg)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-background)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--spacing-md)'
              }}>
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', display: 'block' }}>
                    {apt.patient.name}
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block' }}>
                    Email: {apt.patient.email} • Scheduled: {new Date(apt.date).toLocaleDateString()} at {new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                    Concern: {apt.disease || 'General Consultation'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                  {/* Status Tag */}
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    backgroundColor: apt.status === 'PENDING' ? 'var(--color-warning)' : 
                                     apt.status === 'APPROVED' ? 'var(--color-primary-light)' : 
                                     apt.status === 'COMPLETED' ? 'var(--color-success)' : 'var(--color-error)',
                    color: 'white'
                  }}>
                    {apt.status === 'APPROVED' ? '✓ Sent to Doctor' : apt.status}
                  </span>

                  {/* Payment Tag */}
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
                      {apt.paymentStatus === 'PAID_ONLINE' ? '✓ Paid Online (QR)' : 
                       apt.paymentStatus === 'PAID_AT_COUNTER' ? '✓ Paid at Counter' : '🏥 Pay on Arrival (₹500 Due)'}
                    </span>
                    {apt.transactionId && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        UTR: {apt.transactionId}
                      </span>
                    )}
                  </div>

                  {/* If Pay at Hospital, Receptionist can mark as settled */}
                  {apt.paymentStatus === 'PAY_AT_HOSPITAL' && (
                    <form action={updatePaymentStatus}>
                      <input type="hidden" name="appointmentId" value={apt.id} />
                      <input type="hidden" name="paymentStatus" value="PAID_AT_COUNTER" />
                      <button type="submit" className="btn btn-outline" style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem', borderColor: 'var(--color-success)', color: 'var(--color-success)' }}>
                        Mark ₹500 Collected
                      </button>
                    </form>
                  )}
                  
                  {/* Approval Actions */}
                  {apt.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <form action={updateAppointmentStatus}>
                        <input type="hidden" name="appointmentId" value={apt.id} />
                        <input type="hidden" name="status" value="APPROVED" />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                          Approve →
                        </button>
                      </form>

                      <form action={updateAppointmentStatus}>
                        <input type="hidden" name="appointmentId" value={apt.id} />
                        <input type="hidden" name="status" value="CANCELLED" />
                        <button type="submit" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
                          Decline / Cancel
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancelled Appointments Archive */}
      <div className="card" style={{ padding: 'var(--spacing-xl)', borderLeft: '4px solid var(--color-error)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-error)', margin: 0 }}>
              🚫 Cancelled Appointments Archive
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Appointments declined or cancelled by reception (hidden from doctor)
            </span>
          </div>
          <span style={{ 
            padding: '3px 10px', 
            borderRadius: 'var(--radius-full)', 
            backgroundColor: 'var(--color-accent)', 
            color: 'var(--color-error)', 
            fontWeight: 600, 
            fontSize: '0.85rem' 
          }}>
            {cancelledCount} Cancelled Total
          </span>
        </div>

        {cancelledAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>No cancelled appointments. All declined bookings will be logged here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {cancelledAppointments.map(apt => (
              <div key={apt.id} style={{ 
                padding: 'var(--spacing-md)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-md)', 
                backgroundColor: 'var(--color-background)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--spacing-sm)',
                opacity: 0.85
              }}>
                <div>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-text-main)', display: 'block' }}>
                    {apt.patient.name}
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    Email: {apt.patient.email} • Cancelled Slot: {new Date(apt.date).toLocaleDateString()} at {new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-error)', display: 'block' }}>
                    Issue: {apt.disease || 'General Consultation'} • Status: CANCELLED
                  </span>
                </div>

                <form action={updateAppointmentStatus}>
                  <input type="hidden" name="appointmentId" value={apt.id} />
                  <input type="hidden" name="status" value="APPROVED" />
                  <button type="submit" className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                    Re-Approve to Doctor Queue
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { bookAppointment } from '@/app/dashboard/patient/actions';

export default function BookingForm() {
  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'SUCCESS'>('DETAILS');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [disease, setDisease] = useState('');
  const [paymentOption, setPaymentOption] = useState<'UPI_QR' | 'HOSPITAL_COUNTER'>('UPI_QR');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrPaid, setQrPaid] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsProcessing(true);

    const formData = new FormData();
    formData.append('date', date);
    formData.append('time', time);
    formData.append('disease', disease || 'General Ayurvedic Consultation');
    formData.append('paymentMethod', paymentOption);
    if (paymentOption === 'UPI_QR') {
      formData.append('transactionId', transactionId);
    }

    try {
      const res = await bookAppointment(formData);
      if (res && res.error) {
        setFormError(res.error);
      } else {
        setStep('SUCCESS');
      }
    } catch {
      setFormError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="card" style={{ padding: 'var(--spacing-xl)', boxShadow: 'var(--shadow-md)' }}>
      {formError && (
        <div 
          role="alert"
          style={{
            backgroundColor: '#fdf2f2',
            color: 'var(--color-error)',
            border: '1px solid #f8b4b4',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.88rem',
            marginBottom: 'var(--spacing-md)',
            lineHeight: '1.4'
          }}
        >
          ⚠️ {formError}
        </div>
      )}

      {step === 'DETAILS' && (
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!date || !time) {
            setFormError('Please select both a consultation date and time slot.');
            return;
          }
          setFormError(null);
          setStep('PAYMENT');
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>
              Book an Appointment
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, background: 'var(--color-accent)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
              Step 1 of 2
            </span>
          </div>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'var(--spacing-lg)' }}>
            Schedule a personalized one-on-one session with Chief Physician Dr. Krishna Murthy.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="date">Consultation Date</label>
            <input 
              className="form-input" 
              type="date" 
              id="date" 
              value={date}
              min={todayStr}
              required
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="time">Preferred Time Slot</label>
            <select 
              className="form-input" 
              id="time" 
              value={time} 
              required
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Select Time Slot</option>
              <option value="09:00">09:00 AM - Morning Consultation</option>
              <option value="10:30">10:30 AM - Morning Consultation</option>
              <option value="11:45">11:45 AM - Pulse Diagnosis Slot</option>
              <option value="14:00">02:00 PM - Afternoon Consultation</option>
              <option value="15:30">03:30 PM - Afternoon Consultation</option>
              <option value="17:00">05:00 PM - Evening Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="disease">Health Concern / Primary Symptoms</label>
            <input 
              className="form-input" 
              type="text" 
              id="disease" 
              placeholder="e.g. Joint pain, chronic acidity, stress, skin issues..."
              value={disease}
              onChange={(e) => setDisease(e.target.value)} 
            />
          </div>

          <div style={{ 
            backgroundColor: 'var(--color-accent)', 
            padding: 'var(--spacing-md)', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                Consultation Fee
              </strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Includes Pulse Diagnosis & Initial Prescription
              </span>
            </div>
            <strong style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>
              ₹500
            </strong>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
            Proceed to Payment & Confirmation →
          </button>
        </form>
      )}

      {step === 'PAYMENT' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>
              Payment & Confirmation
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, background: 'var(--color-accent)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
              Step 2 of 2
            </span>
          </div>

          <div style={{ 
            padding: 'var(--spacing-md)', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: 'var(--spacing-lg)',
            backgroundColor: 'var(--color-background)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Date & Time:</span>
              <strong style={{ fontSize: '0.9rem' }}>{date} at {time}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Concern:</span>
              <span style={{ fontSize: '0.9rem' }}>{disease || 'General Consultation'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed var(--color-border)' }}>
              <span style={{ fontWeight: 600 }}>Total Amount:</span>
              <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>₹500.00</strong>
            </div>
          </div>

          {/* Payment Choice Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-md)', 
              padding: 'var(--spacing-md)', 
              borderRadius: 'var(--radius-md)', 
              border: paymentOption === 'UPI_QR' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: paymentOption === 'UPI_QR' ? 'var(--color-accent)' : 'var(--color-surface)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}>
              <input 
                type="radio" 
                name="paymentChoice" 
                checked={paymentOption === 'UPI_QR'} 
                onChange={() => setPaymentOption('UPI_QR')}
              />
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                  📱 Pay Online via QR Code (UPI / GooglePay / PhonePe)
                </strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  Instant digital receipt & verified booking
                </span>
              </div>
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-md)', 
              padding: 'var(--spacing-md)', 
              borderRadius: 'var(--radius-md)', 
              border: paymentOption === 'HOSPITAL_COUNTER' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: paymentOption === 'HOSPITAL_COUNTER' ? 'var(--color-accent)' : 'var(--color-surface)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}>
              <input 
                type="radio" 
                name="paymentChoice" 
                checked={paymentOption === 'HOSPITAL_COUNTER'} 
                onChange={() => setPaymentOption('HOSPITAL_COUNTER')}
              />
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                  🏥 Pay at Hospital Counter (Pay on Arrival)
                </strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  Book without paying now. Pay cash/card at front desk upon visit.
                </span>
              </div>
            </label>
          </div>

          {/* QR Code Gateway Display */}
          {paymentOption === 'UPI_QR' && (
            <div style={{ 
              textAlign: 'center', 
              padding: 'var(--spacing-lg)', 
              backgroundColor: '#ffffff', 
              borderRadius: 'var(--radius-lg)', 
              border: '2px dashed var(--color-secondary-dark)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <p style={{ fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: 'var(--spacing-xs)' }}>
                Scan with any UPI App to Pay ₹500
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--spacing-md)' }}>
                UPI ID: <code style={{ background: 'var(--color-accent)', padding: '2px 6px', borderRadius: '4px' }}>dhanvanthari.ayur@upi</code>
              </span>

              {/* Dynamic QR Code Visualization */}
              <div style={{ 
                width: '180px', 
                height: '180px', 
                margin: '0 auto var(--spacing-md)',
                padding: '10px',
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=dhanvanthari.ayur@upi%26pn=DhanvanthariHospital%26am=500%26cu=INR`} 
                  alt="Payment QR Code" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    // Fallback visual if offline
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {!qrPaid ? (
                <button 
                  type="button" 
                  onClick={() => setQrPaid(true)} 
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '0.35rem 1rem', borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
                >
                  ✓ Confirm Payment Sent via UPI
                </button>
              ) : (
                <div style={{ 
                  color: 'var(--color-success)', 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <span>✓</span> Payment Recorded (₹500)
                </div>
              )}

              <div style={{ marginTop: 'var(--spacing-md)', textAlign: 'left' }}>
                <label className="form-label" htmlFor="transactionId" style={{ fontSize: '0.85rem' }}>
                  UPI Reference / UTR Number (Optional):
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="transactionId"
                  placeholder="e.g. 12-digit UPI UTR / Transaction Ref ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  maxLength={50}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
                  Helps front desk reception instantly cross-verify your payment.
                </span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button 
              type="button" 
              onClick={() => setStep('DETAILS')} 
              className="btn btn-outline" 
              style={{ flex: 1, padding: '0.75rem' }}
            >
              ← Back
            </button>
            <button 
              type="button" 
              onClick={handleSubmit} 
              disabled={isProcessing || (paymentOption === 'UPI_QR' && !qrPaid)}
              className="btn btn-primary" 
              style={{ flex: 2, padding: '0.75rem' }}
            >
              {isProcessing ? 'Confirming...' : paymentOption === 'UPI_QR' ? 'Complete Booking (Paid)' : 'Confirm Pay at Hospital Booking'}
            </button>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-lg) 0' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--color-accent)', 
            color: 'var(--color-primary)', 
            fontSize: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto var(--spacing-md)' 
          }}>
            ✓
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: 'var(--spacing-xs)' }}>
            Appointment Requested!
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: 'var(--spacing-lg)' }}>
            {paymentOption === 'UPI_QR' 
              ? `Your online payment was recorded${transactionId ? ` (Ref: ${transactionId})` : ''}. The receptionist has received your booking for approval.`
              : 'Your booking has been created with "Pay at Hospital Counter". Please arrive 10 minutes prior.'}
          </p>
          <button 
            type="button" 
            onClick={() => {
              setStep('DETAILS');
              setDate('');
              setTime('');
              setDisease('');
              setTransactionId('');
              setQrPaid(false);
            }} 
            className="btn btn-outline"
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  );
}

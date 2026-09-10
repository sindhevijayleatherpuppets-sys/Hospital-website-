import Link from 'next/link';

export default function LocationPage() {
  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-accent)', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--spacing-xs)' }}>
          <span style={{ color: 'var(--color-warning)' }}>★★★★★</span>
          <span style={{ color: 'var(--color-nav)', fontWeight: 600, fontSize: '0.85rem' }}>Rated 4.5 / 5.0 (32+ Reviews)</span>
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary-dark)' }}>
          Hospital Location &amp; Visiting Hours
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto' }}>
          Dhanvanthari Ayurveda Hospital &amp; Panchakarma Centre — easily accessible in Chikkaballapur with full inpatient &amp; outpatient amenities.
        </p>
      </div>
      
      <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-xl)', padding: 'var(--spacing-2xl)' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-nav)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Main Hospital Campus
            </span>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', margin: '4px 0 var(--spacing-md)' }}>
              Dhanvanthari Ayurveda Hospital
            </h2>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>
                📍 Complete Postal Address:
              </strong>
              <p style={{ color: 'var(--color-text-main)', lineHeight: '1.6', margin: 0, fontSize: '0.98rem' }}>
                # 935/846, Ward No. 5,<br />
                Dinnehosahalli Main Road (Prashanth Nagar Road),<br />
                <strong>Near Police Samubhaya Bhavana</strong>,<br />
                Chikballapur Rural, <strong>Chikkaballapur - 562 101</strong>, Karnataka
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>
                🕒 Official OPD Visiting Hours:
              </strong>
              <div style={{ color: 'var(--color-text-main)', margin: 0, fontSize: '0.92rem', lineHeight: '1.6', backgroundColor: 'var(--color-accent)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: '0 0 4px' }}>
                  <strong>Morning Shift:</strong> 10:00 AM – 02:00 PM
                </p>
                <p style={{ margin: '0 0 4px' }}>
                  <strong>Evening Shift:</strong> 05:00 PM – 09:00 PM
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>
                  Open Monday through Saturday (Sunday consultations by prior appointment)
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>
                💳 Accepted Payment Modes:
              </strong>
              <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem' }}>
                UPI (PhonePe, Google Pay, Paytm, Amazon Pay), Cash, Net Banking &amp; Hospital Counter
              </p>
            </div>

            <Link href="/auth/login" className="btn btn-primary" style={{ backgroundColor: 'var(--color-nav)', padding: '0.75rem 1.6rem' }}>
              Book an Appointment with Dr. Krishna Murthy →
            </Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ 
              width: '100%', 
              height: '240px', 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
            }}>
              <img 
                src="/images/hsptl.jpg" 
                alt="Dhanvanthari Hospital Facility" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            <div style={{ 
              padding: 'var(--spacing-md)', 
              backgroundColor: 'var(--color-accent)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <strong style={{ color: 'var(--color-primary-dark)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                🚗 Landmark &amp; Accessibility
              </strong>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                Located right near <strong>Police Samubhaya Bhavana</strong> on Dinnehosahalli Main Road. Easy road access with dedicated patient vehicle parking.
              </p>
            </div>

            <div style={{ 
              padding: 'var(--spacing-md)', 
              backgroundColor: '#ffffff', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <strong style={{ color: 'var(--color-nav)', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>
                ★ Patient Recommendation
              </strong>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                &ldquo;Doctor Krishna Murthy listens to the problem completely and gives proper medicine which yields complete cure.&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import ServicesChecklist from "@/components/ServicesChecklist";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, var(--color-background), var(--color-accent))',
        padding: 'var(--spacing-3xl) var(--spacing-lg)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="animate-float" style={{
            marginBottom: 'var(--spacing-xl)',
            display: 'inline-block'
          }}>
            <img 
              src="/images/logo.png" 
              alt="Dhanvanthari Ayurveda Hospital Crest" 
              style={{ 
                maxWidth: '260px', 
                height: 'auto', 
                borderRadius: 'var(--radius-xl)', 
                boxShadow: '0 12px 30px rgba(1, 45, 29, 0.12)',
                objectFit: 'contain'
              }} 
            />
          </div>
          
          <span style={{ 
            display: 'block', 
            color: 'var(--color-primary)', 
            fontWeight: 600, 
            letterSpacing: '0.12em', 
            textTransform: 'uppercase', 
            fontSize: '0.95rem',
            marginBottom: 'var(--spacing-xs)'
          }}>
            Dhanvanthari Ayurveda Hospital
          </span>

          <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary-dark)' }}>
            Natural Healing,<br/>Rooted in Classical Tradition
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto var(--spacing-xl)', lineHeight: '1.7' }}>
            Experience authentic Ayurvedic healing overseen directly by our Chief Physician. Personalized dosha balance, herbal therapy, and dedicated care.
          </p>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/login" className="btn btn-primary animate-pulse-glow" style={{ padding: '0.85rem 2.2rem', fontSize: '1.1rem' }}>
              Book Appointment & Pay (QR / Counter) →
            </Link>
            <Link href="/services" className="btn btn-secondary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.1rem' }}>
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* Hospital Features Section */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--color-primary-dark)' }}>
            Complete Ayurvedic Healthcare Under One Roof
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Integrating classical Shastric protocols with modern patient convenience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>👨‍⚕️</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--spacing-xs)' }}>One Dedicated Physician</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              No rotating doctors. Dr. Krishna Murthy personally conducts pulse diagnosis, creates your herbal formula, and oversees your recovery.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>📱</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--spacing-xs)' }}>QR Payment & Pay on Arrival</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Instant contactless QR code payment with digital receipt, or choose to pay at the hospital counter upon visit.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>📜</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--spacing-xs)' }}>Digital Online Prescriptions</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Access your official medical prescriptions, herbal dosages, and dietary (Pathya) instructions securely from your dashboard anytime.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>🌿</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--spacing-xs)' }}>In-House Herbal Dispensary</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Authentic Rasayanas, herbal oils, and Kashayams compounded fresh in our apothecary unit for optimum clinical results.
            </p>
          </div>
        </div>

        {/* Official Services Checklist */}
        <div style={{ marginTop: 'var(--spacing-3xl)' }}>
          <ServicesChecklist />
        </div>
      </section>

      {/* Meet the Doctor Section */}
      <section style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-3xl) var(--spacing-lg)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2xl)', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/images/doctor-image.png" 
              alt="Dr. Krishna Murthy" 
              style={{ 
                width: '100%', 
                maxWidth: '380px', 
                height: 'auto', 
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)'
              }} 
            />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-accent)', padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ color: 'var(--color-warning)', fontSize: '0.85rem' }}>★★★★★</span>
              <span style={{ color: 'var(--color-nav)', fontWeight: 600, fontSize: '0.8rem' }}>4.5 / 5.0 on Justdial (32+ Reviews)</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', margin: 'var(--spacing-xs) 0 var(--spacing-md)', color: 'var(--color-primary-dark)' }}>
              Dr. Krishna Murthy B.A.M.S., M.D. (Ayurveda)
            </h2>
            <p style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
              Chief Physician at Dhanvanthari Ayurveda Hospital &amp; Panchakarma Centre, Chikkaballapur. Known for attentive pulse assessment (Nadi Pariksha), patient-first bedside care, and classical treatments that cure diseases from the root.
            </p>
            <ul style={{ listStyle: 'none', marginBottom: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-primary)' }}>🌿</span> Personalized Dosha & Prakriti Assessment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-primary)' }}>🌿</span> In-House Herbal Formulations & Oils
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-primary)' }}>🌿</span> Panchakarma Therapy & Rejuvenation Retreats
              </li>
            </ul>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <Link href="/about" className="btn btn-primary">Read Full Hospital Story</Link>
              <Link href="/auth/login" className="btn btn-outline">Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

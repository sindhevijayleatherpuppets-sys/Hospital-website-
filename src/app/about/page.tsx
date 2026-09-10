import Link from 'next/link';

export default function AboutPage() {
  const patientReviews = [
    {
      name: 'Ramya B S',
      rating: 5,
      date: 'Verified Patient Review',
      review: 'Doctor Krishna Murthy listens to the problem completely and gives proper medicine and guidance throughout the treatment which yields complete cure. Excellent Ayurvedic doctor with good treatments available here.'
    },
    {
      name: 'Sai Spandana',
      rating: 5,
      date: 'Verified Patient Review',
      review: 'I had a very positive experience. The doctor was kind, patient, and took the time to understand my concerns. The treatment was very effective, and I recovered within a short period.'
    },
    {
      name: 'Diwakar',
      rating: 5,
      date: 'Verified Patient Review',
      review: 'Best doctor with effective treatment and complete compassionate care.'
    }
  ];

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-accent)', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--spacing-xs)' }}>
          <span style={{ color: 'var(--color-warning)', fontSize: '0.9rem' }}>★★★★★</span>
          <span style={{ color: 'var(--color-nav)', fontWeight: 600, fontSize: '0.85rem' }}>4.5 / 5.0 Rating (32+ Verified Justdial Reviews)</span>
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary-dark)' }}>
          Rooted in Tradition, Devoted to Your Healing
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          Dhanvanthari Ayurveda Hospital &amp; Panchakarma Centre in Chikkaballapur — providing trusted, authentic Ayurvedic treatment under Chief Physician Dr. Krishna Murthy.
        </p>
      </div>

      {/* Main Two-Column Section: Hospital Details Left, Physician Photo & Note Right */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: 'var(--spacing-2xl)',
        alignItems: 'start',
        marginBottom: 'var(--spacing-3xl)'
      }}>
        {/* Left Column: Hospital Details & Story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary-dark)' }}>
              Our Hospital & Heritage
            </h2>
            <p style={{ color: 'var(--color-text-main)', lineHeight: '1.8', marginBottom: 'var(--spacing-md)' }}>
              Located near Police Samubhaya Bhavana on Dinnehosahalli Main Road, Chikkaballapur, <strong>Dhanvanthari Ayurveda Hospital</strong> is a sanctuary dedicated to authentic classical medicine and holistic healing.
            </p>
            <p style={{ color: 'var(--color-text-main)', lineHeight: '1.8', marginBottom: 'var(--spacing-md)' }}>
              We specialize in root-cause healing for chronic back pain, IVDC disc problems, sciatica, cervical spondylitis, PCOS, respiratory allergies, and gastrointestinal disorders. By identifying individual <em>Dosha Prakriti</em> imbalances, our therapies restore natural vitality without harsh synthetic side-effects.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', margin: 0 }}>
              Every medicated oil (<em>Taila</em>), decoction (<em>Kashayam</em>), and herbal preparation is prepared following classical Shastric texts for optimal biological efficacy.
            </p>
          </div>

          {/* Hospital Core Pillars */}
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary-dark)' }}>
              Why Patients Trust Dhanvanthari Hospital
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', padding: 0 }}>
              <li style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <span style={{ fontSize: '1.4rem' }}>👨‍⚕️</span>
                <div>
                  <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '2px' }}>
                    Attentive Care by Dr. Krishna Murthy
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Patients receive direct, thorough pulse diagnosis (Nadi Pariksha) and continuous guidance throughout the entire treatment journey.
                  </span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <span style={{ fontSize: '1.4rem' }}>🪔</span>
                <div>
                  <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '2px' }}>
                    Authentic Panchakarma Suites
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Specialized facilities for Kati Basti, Shirodhara, Patrapottali, Shastishalik Pinda Sweda, Janu Vasti, and Herbal Steam Baths.
                  </span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <span style={{ fontSize: '1.4rem' }}>🌿</span>
                <div>
                  <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '2px' }}>
                    Suvarnaprashan Sanskar & Immunization
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Classical Swarna Bhasma pediatric drops administered on Pushya Nakshatra to boost children&apos;s immunity and mental acuity.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Physician Photo & Direct Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div style={{ 
              maxWidth: '360px', 
              margin: '0 auto var(--spacing-lg)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '3px solid var(--color-border)'
            }}>
              <img 
                src="/images/doctor-image.png" 
                alt="Chief Physician Dr. Krishna Murthy" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-primary-dark)' }}>
              Dr. Krishna Murthy B.A.M.S., M.D. (Ayurveda)
            </h3>
            <p style={{ color: 'var(--color-nav)', fontWeight: 600, fontSize: '1rem', marginBottom: 'var(--spacing-md)' }}>
              Chief Ayurvedic Physician &amp; Medical Director
            </p>

            <div style={{ 
              textAlign: 'left', 
              backgroundColor: 'var(--color-accent)', 
              padding: 'var(--spacing-md) var(--spacing-lg)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6', margin: 0 }}>
                &ldquo;Doctor Krishna Murthy listens to the problem completely and gives proper medicine and guidance throughout the treatment which yields complete cure.&rdquo;
              </p>
            </div>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7', textAlign: 'left', marginBottom: 'var(--spacing-lg)' }}>
              Dr. Krishna Murthy brings extensive clinical expertise in diagnosing complex chronic ailments, customizing Panchakarma protocols, and guiding patients with tailored dietary guidelines (Pathya) for permanent recovery.
            </p>

            <Link href="/auth/login" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--color-nav)' }}>
              Schedule a Consultation with Dr. Krishna Murthy
            </Link>
          </div>

          {/* Quick Hospital Facts Box */}
          <div style={{ 
            backgroundColor: 'var(--color-surface)', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)', 
            padding: 'var(--spacing-lg)',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center'
          }}>
            <div>
              <strong style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', display: 'block' }}>4.5 ★</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Justdial Rating</span>
            </div>
            <div style={{ borderLeft: '1px solid var(--color-border)' }}></div>
            <div>
              <strong style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', display: 'block' }}>15,000+</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Patients Treated</span>
            </div>
            <div style={{ borderLeft: '1px solid var(--color-border)' }}></div>
            <div>
              <strong style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', display: 'block' }}>100%</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Ayurvedic Care</span>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Testimonials Section */}
      <div style={{ marginTop: 'var(--spacing-2xl)' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          What Our Patients Say
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {patientReviews.map((rev, i) => (
            <div key={i} className="card" style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
                <strong style={{ color: 'var(--color-primary-dark)' }}>{rev.name}</strong>
                <span style={{ color: 'var(--color-warning)', fontSize: '0.85rem' }}>★★★★★</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-nav)', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
                ✓ {rev.date}
              </span>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                &ldquo;{rev.review}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

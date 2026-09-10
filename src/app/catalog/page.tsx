import Link from 'next/link';

export default function CatalogPage() {
  const treatmentPrograms = [
    {
      id: 'back-pain',
      title: 'Spine, Disc & Chronic Back Pain Program',
      subtitle: 'Complete Ayurvedic Care for IVDC, Sciatica & Spondylitis',
      image: '/images/catalog-backpain.png',
      conditions: ['IVDC (Disc Problems)', 'Sciatica Nerve Pain', 'Cervical & Lumbar Spondylitis', 'Obesity-Related Spine Strain'],
      therapies: ['Kati Basti (Warm Medicated Oil Reservoir)', 'Greeva Basti (Cervical Spine Nourishment)', 'Patra Potli & Abhyanga', 'Spine Strengthening Herbal Formulations'],
      description: 'Ayurveda cures spine and disc conditions from the root by deeply nourishing intervertebral tissues, reducing nerve inflammation, and strengthening spinal muscles without invasive surgery.'
    },
    {
      id: 'pcos-pmos',
      title: 'PCOS / PMOS & Hormonal Wellness Program',
      subtitle: 'Holistic Reproductive Health, Weight & Metabolism Care',
      image: '/images/catalog-pcos.png',
      conditions: ['Irregular / Delayed Periods', 'Drastic Unexplained Weight Gain', 'Hormonal Hair Loss & Acne', 'Ovulation & Metabolism Imbalances'],
      therapies: ['Shodhana & Detoxification', 'Classical Herb Combinations (Kanchanar, Shatavari, Ashoka)', 'Metabolic Agni Recalibration', 'Personalized Pathya Diet & Lifestyle Plan'],
      description: 'A 100% safe, natural, and comprehensive protocol that restores ovarian function, balances endocrine pathways, and reverses symptoms of PCOS/PMOS at the cellular root.'
    },
    {
      id: 'respiratory',
      title: 'Respiratory, Sinus & Allergy Relief Program',
      subtitle: 'Root-Cause Healing for Chronic Cough, Cold & Asthma',
      image: '/images/catalog-respiratory.png',
      conditions: ['Chronic Cough & Congestion', 'Sinusitis & Frequent Cold', 'Dust & Environmental Allergies', 'Asthma & Adenoid Inflammation'],
      therapies: ['Nasyam (Medicated Nasal Therapy)', 'Herbal Steam & Dhumapana', 'Agasthya Rasayanam & Kashayam Protocols', 'Immuno-Modulatory Rasayanas'],
      description: 'Classical Ayurvedic treatments that clear respiratory channels (Pranavaha Srotas), soothe inflamed mucus membranes, and build lasting natural immunity against recurring infections.'
    }
  ];

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <span style={{ color: 'var(--color-nav)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.9rem', display: 'block', marginBottom: 'var(--spacing-xs)' }}>
          Clinical Treatment Catalogs
        </span>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary-dark)' }}>
          Disease Specialization Catalogs
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore our specialized clinical treatment programs designed by Chief Physician Dr. Krishna Murthy to treat chronic ailments from their root cause.
        </p>
      </div>

      {/* Catalogs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-3xl)' }}>
        {treatmentPrograms.map((catalog) => (
          <div 
            key={catalog.id} 
            className="card" 
            style={{ 
              padding: 0, 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(45, 90, 60, 0.08)',
              border: '1px solid var(--color-border)',
              transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
            }}
          >
            {/* Catalog Poster Image */}
            <div style={{ width: '100%', backgroundColor: '#f5f0e6', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--color-border)' }}>
              <img 
                src={catalog.image} 
                alt={catalog.title} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '480px',
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>

            {/* Catalog Details */}
            <div style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                {catalog.title}
              </h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-nav)', fontWeight: 600, marginBottom: 'var(--spacing-md)', display: 'block' }}>
                {catalog.subtitle}
              </span>
              
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: 'var(--spacing-lg)' }}>
                {catalog.description}
              </p>

              {/* Conditions Treated */}
              <div style={{ marginBottom: 'var(--spacing-md)', backgroundColor: 'var(--color-accent)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Target Conditions:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {catalog.conditions.map((cond, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        fontSize: '0.8rem', 
                        backgroundColor: '#ffffff', 
                        padding: '3px 8px', 
                        borderRadius: 'var(--radius-sm)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-primary-dark)',
                        fontWeight: 500
                      }}
                    >
                      • {cond}
                    </span>
                  ))}
                </div>
              </div>

              {/* Protocol Highlights */}
              <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Treatment Protocol:
                </strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {catalog.therapies.map((th, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--color-nav)' }}>✓</span> {th}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking CTA */}
              <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                <Link 
                  href="/auth/login" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--color-nav)', textAlign: 'center' }}
                >
                  Consult Doctor for This Program →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hospital Footer Note */}
      <div style={{ 
        backgroundColor: 'var(--color-accent)', 
        padding: 'var(--spacing-xl)', 
        borderRadius: 'var(--radius-lg)', 
        textAlign: 'center',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: 'var(--spacing-xs)' }}>
          Dhanvanthari Ayurveda Hospital • Chikkaballapur
        </h3>
        <p style={{ color: 'var(--color-text-muted)', margin: '0 auto', fontSize: '0.95rem', maxWidth: '600px' }}>
          All treatment programs are customized following an in-depth Prakriti (body constitution) and Nadi Pariksha examination.
        </p>
      </div>
    </div>
  );
}

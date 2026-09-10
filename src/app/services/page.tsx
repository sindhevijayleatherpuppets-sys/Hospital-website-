import Link from 'next/link';
import ServicesChecklist from '@/components/ServicesChecklist';

export default function ServicesPage() {
  const hospitalServices = [
    {
      id: 'marma-chikitsa',
      title: 'Marma Chikitsa',
      subtitle: 'Vital Energy Point Stimulation & Instant Pain Relief',
      image: '/images/marma-chikitsa.jpg',
      duration: '45 Minutes',
      description: 'Ancient Ayurvedic pressure point therapy focused on the 107 vital energy intersections (Marmas) to unblock subtle channels (Prana Vaha Srotas), relieve chronic physical pain, and restore neurological vitality.',
      category: 'Therapy & Pain Relief'
    },
    {
      id: 'ayurvedic-diet',
      title: 'Ayurvedic Diet & Nutrition',
      subtitle: 'Personalized Pathya / Apathya Dosha-Specific Meal Plans',
      image: '/images/ayurvedic-diet.jpg',
      duration: 'Consultation & Dietary Protocol',
      description: 'Custom therapeutic nutrition prescribed by Chief Physician Dr. Krishna Murthy to kindle digestive fire (Agni), eliminate metabolic toxicity (Ama), and nourish all seven bodily tissues (Dhatus).',
      category: 'Ayurvedic Diet'
    },
    {
      id: 'kati-basti',
      title: 'Kati Basti (Panchakarma)',
      subtitle: 'Warm Medicated Oil Reservoir for Lumbar Spine & Sciatica',
      image: '/images/catalog-backpain.png',
      duration: '45 Minutes',
      description: 'A traditional herbal dough ring sealed over the lumbosacral area and filled with warm medicated herbal oil (Mahanarayana / Sahacharadi) to treat IVDC disc herniation, sciatica, and chronic lower back pain.',
      category: 'Spine & Panchakarma'
    },
    {
      id: 'patrapottali',
      title: 'Patrapottali (Elakizhi)',
      subtitle: 'Steamed Medicinal Leaf Bolus Therapy for Joints',
      image: '/images/kizhi.jpg',
      duration: '45 - 60 Minutes',
      description: 'Fresh healing medicinal leaves fried with herbal powders, bundled in linen boluses, dipped in warm medicated oils, and rhythmically applied to reduce joint swelling, stiffness, and arthritis.',
      category: 'Musculoskeletal Care'
    },
    {
      id: 'pinda-sweda',
      title: 'Shastishalik Pinda Sweda',
      subtitle: 'Nourishing Milk-Cooked Medicinal Rice Poultice Massage',
      image: '/images/abhyanga.jpg',
      duration: '60 Minutes',
      description: 'Classical rejuvenation therapy using special Shashtika rice cooked in Balamula herbal decoction and organic cow milk. Deeply strengthens wasting muscles, lubricates degenerated joints, and tones tissues.',
      category: 'Rejuvenation & Nourishment'
    },
    {
      id: 'taildhara',
      title: 'Taildhara (Continuous Medicated Oil Stream)',
      subtitle: 'Targeted Rhythmic Pouring of Classical Herbal Oils',
      image: '/images/shirodhara.jpg',
      duration: '45 - 60 Minutes',
      description: 'A soothing, continuous stream of warm dosha-specific medicated oils poured rhythmically over affected areas to calm neuromuscular inflammation, reduce acute spasms, and stimulate regeneration.',
      category: 'Classical Oil Therapy'
    },
    {
      id: 'ayurvedic-consultant',
      title: 'Ayurvedic Clinical Consultant',
      subtitle: 'Nadi Pariksha (Pulse Assessment) & Prakriti Diagnosis',
      image: '/images/doctor-image.png',
      duration: 'In-Depth Medical Consultation',
      description: 'Direct one-on-one comprehensive clinical consultation with Chief Physician Dr. Krishna Murthy featuring traditional three-finger pulse reading (Nadi Pariksha), tongue analysis, and root-cause disease evaluation.',
      category: 'Consultation & Diagnostics'
    },
    {
      id: 'bp-checkup',
      title: 'Blood Pressure & Cardiovascular Assessment',
      subtitle: 'Integrative Vitals Screening & Herbal Heart Regulation',
      image: '/images/medical.jpg',
      duration: 'Routine Clinical Screening',
      description: 'Clinical vitals monitoring combined with classical Ayurvedic cardiology (Hridya) therapies, herbal formulations (Arjuna, Sarpagandha), and stress-reduction protocols for lasting vascular health.',
      category: 'Cardiovascular Care'
    },
    {
      id: 'shirodhara',
      title: 'Shirodhara (Mind & Nervous System Calm)',
      subtitle: 'Therapeutic Warm Oil Stream Over the Forehead',
      image: '/images/shirodhara.jpg',
      duration: '45 - 60 Minutes',
      description: 'A steady, gentle stream of warm medicated herbal oil poured over the third-eye chakra (Ajna). Scientifically relaxes brain waves, relieves chronic insomnia, tension headaches, and severe stress.',
      category: 'Stress & Neuro Care'
    },
    {
      id: 'fertility-consultant',
      title: 'Fertility & Garbha Sanskar Consultant',
      subtitle: 'Holistic Natural Conception & Reproductive Wellness',
      image: '/images/sweet.jpg',
      duration: 'Specialized Clinical Program',
      description: 'Traditional Ayurvedic preconception detox (Beeja Shuddhi), hormonal balance therapies, and classical Garbha Sanskar guidance to support natural fertility for both men and women.',
      category: 'Fertility & Reproductive Health'
    },
    {
      id: 'herbal-steam-bath',
      title: 'Herbal Steam Bath (Swedana)',
      subtitle: 'Classical Wooden Chamber Medicated Decoction Fomentation',
      image: '/images/steam-bath.jpg',
      duration: '20 - 30 Minutes',
      description: 'Patient sits in an authentic cedar steam box while herbal steam infused with Dashamula and Nirgundi opens peripheral micro-channels (Srotas), liquifies toxins, and promotes deep sweating.',
      category: 'Detox & Swedana'
    },
    {
      id: 'pcos-treatment',
      title: 'Polycystic Ovarian Syndrome (PCOS / PMOS)',
      subtitle: 'Targeted Root-Cause Hormonal & Ovarian Protocol',
      image: '/images/catalog-pcos.png',
      duration: 'Comprehensive Treatment Cycle',
      description: 'A 100% safe and effective protocol combining herbal ovarian regulators (Kanchanar Guggulu, Shatavari), uterine cleansing (Uttar Basti), and metabolic diet to permanently resolve PCOS symptoms.',
      category: 'Women’s Health & Gynecology'
    },
    {
      id: 'janu-vasti',
      title: 'Janu Vasti (Knee Joint Rejuvenation)',
      subtitle: 'Warm Medicated Oil Ring for Knee Pain & Osteoarthritis',
      image: '/images/janu-vasti.jpg',
      duration: '40 - 50 Minutes',
      description: 'Herbal dough reservoirs placed around the knee joints and filled with warm therapeutic oils (Ksheerabala / Mahanarayana) to regenerate knee cartilage, ease stiffness, and restore smooth mobility.',
      category: 'Joint & Arthritis Care'
    },
    {
      id: 'panchakarma-full',
      title: 'Panchakarma Detox & Skin Therapy',
      subtitle: 'Complete 5-Stage Cellular Purification & Rejuvenation',
      image: '/images/panchakarma.jpg',
      duration: '7 to 21 Days',
      description: 'The premier five-fold classical Ayurvedic cleansing procedure that purges deep cellular toxicity, cures chronic skin conditions, revitalizes the immune system, and reverses premature aging.',
      category: 'Panchakarma & Detox'
    }
  ];

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <span style={{ 
          color: 'var(--color-nav)', 
          fontWeight: 600, 
          letterSpacing: '0.12em', 
          textTransform: 'uppercase', 
          fontSize: '0.9rem',
          display: 'block',
          marginBottom: 'var(--spacing-xs)'
        }}>
          Classical Shastric Therapies
        </span>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary-dark)' }}>
          Hospital Treatment Services & Therapies
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.6' }}>
          Comprehensive Ayurvedic clinical therapies, immunization sanskars, and Panchakarma protocols provided at Dhanvanthari Ayurveda Hospital under the guidance of Chief Physician Dr. Krishna Murthy.
        </p>
      </div>

      {/* Official Services Directory Grid */}
      <ServicesChecklist />

      {/* Detailed Treatment Cards Grid */}
      <div style={{ marginTop: 'var(--spacing-3xl)', marginBottom: 'var(--spacing-md)' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: 'var(--spacing-xs)' }}>
          Detailed Clinical Therapy Profiles & Procedures
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: 'var(--spacing-xl)' }}>
          Explore authentic procedural photos, durations, and health benefits for each specialized treatment.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-3xl)' }}>
        {hospitalServices.map((item) => (
          <div 
            key={item.id} 
            className="card" 
            style={{ 
              padding: 0, 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 6px 20px rgba(45, 90, 60, 0.07)',
              border: '1px solid var(--color-border)',
              transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
            }}
          >
            {/* Image Header with Real Treatment Photo */}
            <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-surface-hover)' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
              <span style={{ 
                position: 'absolute', 
                top: '12px', 
                left: '12px', 
                backgroundColor: 'var(--color-nav)', 
                color: '#ffffff', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                padding: '3px 9px', 
                borderRadius: 'var(--radius-full)'
              }}>
                {item.category}
              </span>
              <span style={{ 
                position: 'absolute', 
                bottom: '12px', 
                right: '12px', 
                backgroundColor: 'rgba(29, 45, 36, 0.85)', 
                color: '#ffffff', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                padding: '3px 8px', 
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(4px)'
              }}>
                ⏱️ {item.duration}
              </span>
            </div>

            {/* Details */}
            <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '4px', color: 'var(--color-primary-dark)' }}>
                {item.title}
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-nav)', fontWeight: 600, marginBottom: 'var(--spacing-sm)', display: 'block' }}>
                {item.subtitle}
              </span>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', lineHeight: '1.6', flexGrow: 1, marginBottom: 'var(--spacing-lg)' }}>
                {item.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid var(--color-border)' }}>
                <Link 
                  href="/auth/login" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: 'var(--color-nav)', textAlign: 'center', fontSize: '0.9rem' }}
                >
                  Book Therapy Consultation →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hospital Consultation CTA */}
      <div style={{ 
        backgroundColor: 'var(--color-accent)', 
        padding: 'var(--spacing-2xl)', 
        borderRadius: 'var(--radius-xl)', 
        textAlign: 'center',
        border: '1px solid var(--color-border)'
      }}>
        <span style={{ color: 'var(--color-nav)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Personalized Treatment Plan
        </span>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', margin: '6px 0 var(--spacing-xs)' }}>
          Comprehensive Nadi Pariksha & Dosha Diagnosis
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto var(--spacing-lg)', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Schedule a direct clinical consultation with Chief Physician Dr. Krishna Murthy to formulate a tailored regimen combining Ayurvedic immunization, Shirodhara, Basti, and Panchakarma.
        </p>
        <Link href="/auth/login" className="btn btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem', backgroundColor: 'var(--color-nav)' }}>
          Schedule Doctor Consultation
        </Link>
      </div>
    </div>
  );
}

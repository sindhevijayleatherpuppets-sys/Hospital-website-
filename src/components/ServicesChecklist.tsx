import React from 'react';

export default function ServicesChecklist() {
  const serviceItems = [
    { title: 'Marma Chikitsa', desc: 'Vital pressure point therapy for energy flow and pain relief' },
    { title: 'Ayurvedic Diet', desc: 'Customized Pathya / Apathya nutritional guidelines by dosha' },
    { title: 'Kati Basti (Panchkarma)', desc: 'Warm medicated oil reservoir for lower back & lumbar spine' },
    { title: 'Patrapottali', desc: 'Warm medicinal leaf bundle massage for joints and muscles' },
    { title: 'Shastishalik Pinda Sweda', desc: 'Medicated milk-rice poultice for tissue rejuvenation' },
    { title: 'Taildhara', desc: 'Continuous stream of herbal oil over specific body points' },
    { title: 'Ayurvedic nutrition', desc: 'Whole-body metabolic nourishment and Agni balance' },
    { title: 'Ayurvedic Consultant', desc: 'In-depth Prakriti, Nadi Pariksha & clinical consultation' },
    { title: 'Blood Pressure Check-Up', desc: 'Vital screening and herbal cardiovascular balancing' },
    { title: 'Shirodhara', desc: 'Relaxing herbal oil stream over forehead for deep calm' },
    { title: 'Fertility Consultant', desc: 'Holistic reproductive health, Garbha Sanskar & care' },
    { title: 'Herbal Steam Bath', desc: 'Classical Swedana steam to open micro-channels' },
    { title: 'Polycystic Ovarian Syndrome (PCOS)', desc: 'Targeted root-cause hormone & metabolism protocol' },
    { title: 'Janu Vasti', desc: 'Specialized medicated oil ring for knee joint arthritis' },
  ];

  const therapyItems = [
    { 
      title: 'Ayurvedic Immunization', 
      desc: 'Classical pediatric and adult disease resistance regimens that enhance innate cellular immunity (Vyadhikshamatwa).' 
    },
    { 
      title: 'Snehapanam', 
      desc: 'Preparatory graduated intake of medicated ghee (Ghrita) on an empty stomach to soften tissues and loosen deep toxins.' 
    },
    { 
      title: 'Yoniprakshalanam', 
      desc: 'Specialized herbal decoction douching and reproductive tract cleansing for gynecological health and pelvic wellness.' 
    },
    { 
      title: 'Pindasweda', 
      desc: 'Steamed medicated rice and herbal leaf bolus massage to strengthen weakened muscles and relieve degenerative stiffness.' 
    },
    { 
      title: 'Eyes Akshitarpam', 
      desc: 'Medicated Triphala ghee bath retained around the eyes to relieve digital strain, dryness, and refractive fatigue.' 
    },
    { 
      title: 'Hrid Basti', 
      desc: 'Warm medicated herbal oil pooling over the cardiac chest center to strengthen heart muscles and reduce anxiety.' 
    },
    { 
      title: 'Kaya Seka (Pizhichil)', 
      desc: 'Continuous royal streams of warm therapeutic oils poured over the entire body for nervous system rejuvenation.' 
    },
    { 
      title: 'Panchakarma Ayurvedic Skin', 
      desc: 'Comprehensive 5-stage detoxification therapies to cure chronic eczema, psoriasis, dermatitis, and skin impurities.' 
    },
    { 
      title: 'Suvarnaprashan Sanskar Ayurvedic Immunization', 
      desc: 'Ancient 24k Swarna Bhasma, Brahmi, and honey elixir administered on Pushya Nakshatra for intelligence, immunity & vitality in children.' 
    },
    { 
      title: 'Greeva Basti', 
      desc: 'Herbal dough reservoir filled with warm therapeutic oil over the cervical spine for neck pain and cervical spondylitis.' 
    },
    { 
      title: 'Udwarthanam', 
      desc: 'Deep upward herbal powder scrub massage to break down subcutaneous adipose fat and stimulate lymphatic circulation.' 
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)', margin: 'var(--spacing-2xl) 0' }}>
      
      {/* BOX 1: OUR SERVICES */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--spacing-2xl) var(--spacing-xl)',
        boxShadow: '0 8px 30px rgba(45, 90, 60, 0.07)',
        border: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          backgroundColor: 'var(--color-nav)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xl)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <div>
            <span style={{ color: 'var(--color-nav)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
              Dhanvanthari Ayurveda Hospital
            </span>
            <h2 style={{
              fontSize: '2rem',
              color: 'var(--color-primary-dark)',
              margin: 0,
              fontWeight: 700,
              fontFamily: 'var(--font-heading)'
            }}>
              Our Services
            </h2>
          </div>
          <span style={{ 
            fontSize: '0.85rem', 
            color: 'var(--color-primary-dark)', 
            fontWeight: 600, 
            backgroundColor: 'var(--color-accent)', 
            padding: '6px 14px', 
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)'
          }}>
            ✓ 14 Comprehensive Outpatient & Clinical Services
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-md)'
        }}>
          {serviceItems.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.85rem',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                transition: 'transform var(--transition-fast)'
              }}
            >
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: 'var(--color-nav)',
                lineHeight: 1,
                marginTop: '2px',
                flexShrink: 0
              }}>
                ✓
              </span>
              <div>
                <strong style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-main)',
                  display: 'block',
                  lineHeight: 1.3,
                  marginBottom: '3px'
                }}>
                  {item.title}
                </strong>
                <span style={{
                  fontSize: '0.84rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.45,
                  display: 'block'
                }}>
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOX 2: THERAPIES & SHALAKYA / PANCHAKARMA */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--spacing-2xl) var(--spacing-xl)',
        boxShadow: '0 8px 30px rgba(45, 90, 60, 0.07)',
        border: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          backgroundColor: 'var(--color-primary)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xl)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <div>
            <span style={{ color: 'var(--color-nav)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
              Specialized Shastric Chikitsa
            </span>
            <h2 style={{
              fontSize: '2rem',
              color: 'var(--color-primary-dark)',
              margin: 0,
              fontWeight: 700,
              fontFamily: 'var(--font-heading)'
            }}>
              Therapy &amp; Immunization Procedures
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '0.85rem', 
              color: 'var(--color-nav)', 
              fontWeight: 600, 
              backgroundColor: 'var(--color-accent)', 
              padding: '6px 14px', 
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)'
            }}>
              ⭐ Justdial Verified Hospital Listing
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-md)'
        }}>
          {therapyItems.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.85rem',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-accent)',
                border: '1px solid var(--color-border)',
                transition: 'transform var(--transition-fast)'
              }}
            >
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: 'var(--color-primary)',
                lineHeight: 1,
                marginTop: '2px',
                flexShrink: 0
              }}>
                ✓
              </span>
              <div>
                <strong style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-primary-dark)',
                  display: 'block',
                  lineHeight: 1.3,
                  marginBottom: '3px'
                }}>
                  {item.title}
                </strong>
                <span style={{
                  fontSize: '0.84rem',
                  color: 'var(--color-text-main)',
                  lineHeight: 1.45,
                  display: 'block'
                }}>
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: 'var(--spacing-xl)', 
          paddingTop: 'var(--spacing-md)', 
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--spacing-sm)',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)'
        }}>
          <span>
            📍 <strong>Dhanvanthari Ayurveda Hospital:</strong> Near Police Samubhaya Bhavana, Dinnehosahalli Main Road, Chikkaballapur
          </span>
          <span>
            Chief Physician: <strong>Dr. Krishna Murthy</strong>
          </span>
        </div>
      </div>

    </div>
  );
}

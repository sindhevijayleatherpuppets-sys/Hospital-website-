import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function MedicineStorePage() {
  const products = await prisma.product.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <span style={{ color: 'var(--color-nav)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.9rem', display: 'block', marginBottom: 'var(--spacing-xs)' }}>
          Authentic Herbal Apothecary
        </span>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary-dark)' }}>
          Ayurvedic Medicine Store
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
          Classical herbal oils, arishtams, kashayams, and rejuvenating rasayanas compounded according to traditional Shastric standards.
        </p>
      </div>

      {/* Medicines Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-3xl)' }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className="card" 
            style={{ 
              padding: 0, 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 4px 16px rgba(45, 90, 60, 0.06)',
              border: '1px solid var(--color-border)',
              transition: 'all var(--transition-normal)'
            }}
          >
            <div style={{ width: '100%', height: '220px', position: 'relative', backgroundColor: 'var(--color-surface-hover)' }}>
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                  [Herbal Medicine]
                </div>
              )}
              <span style={{ 
                position: 'absolute', 
                top: '10px', 
                left: '10px', 
                backgroundColor: 'rgba(255, 255, 255, 0.92)', 
                color: 'var(--color-nav)', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                padding: '3px 8px', 
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(4px)'
              }}>
                100% Ayurvedic
              </span>
            </div>

            <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-primary-dark)' }}>
                {product.name}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.5', flexGrow: 1, marginBottom: 'var(--spacing-md)' }}>
                {product.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  ₹{product.price.toFixed(0)}
                </span>
                
                <Link 
                  href="/auth/login" 
                  className="btn btn-primary" 
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', backgroundColor: 'var(--color-nav)' }}
                >
                  Order / Inquire
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Notice */}
      <div style={{ 
        backgroundColor: 'var(--color-accent)', 
        padding: 'var(--spacing-xl)', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: 'var(--spacing-md)',
        border: '1px solid var(--color-border)'
      }}>
        <div>
          <strong style={{ color: 'var(--color-primary-dark)', fontSize: '1.1rem', display: 'block', marginBottom: '2px' }}>
            Looking for Doctor-Prescribed Specialized Formulations?
          </strong>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Book a consultation to get custom Kashayams and Churnas prescribed specifically for your health condition.
          </span>
        </div>
        <Link href="/auth/login" className="btn btn-primary" style={{ backgroundColor: 'var(--color-nav)', padding: '0.65rem 1.4rem' }}>
          Consult Chief Physician →
        </Link>
      </div>
    </div>
  );
}

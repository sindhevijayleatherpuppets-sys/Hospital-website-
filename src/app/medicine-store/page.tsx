import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type StoreProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

const FALLBACK_PRODUCTS: StoreProduct[] = [
  {
    id: 'fb-1',
    name: 'Ashwagandha Rasayana Powder',
    description: 'Premier adaptogenic formulation for vitality, stress balance, and deep nervous system rejuvenation.',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'fb-2',
    name: 'Triphala Churna (Organic Detox)',
    description: 'Classical combination of Amalaki, Bibhitaki, and Haritaki for optimal digestive fire and gentle colon cleansing.',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'fb-3',
    name: 'Kshirabala Thailam & Brahmi Oil',
    description: 'Classical medicated sesame oil boiled 101 times with cow milk and Sida cordifolia for sound sleep and joint relief.',
    price: 349,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'fb-4',
    name: 'Dhanvanthari Gulika & Tablets',
    description: 'Time-tested Ayurvedic formulation for digestive discomfort, gas, and balancing vata dosha.',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'fb-5',
    name: 'Chyawanprash Awaleha',
    description: 'Potent amla-based immunity booster packed with 40+ rejuvenating herbs for year-round respiratory strength.',
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'fb-6',
    name: 'Mahanarayana Muscle Care Oil',
    description: 'Traditional Ayurvedic therapeutic massage oil for deep muscle relaxation, stiffness, and joint mobility.',
    price: 375,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default async function MedicineStorePage() {
  let products: StoreProduct[] = FALLBACK_PRODUCTS;
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { price: 'asc' }
    });
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts;
    }
  } catch (err) {
    console.error('Database connection error in MedicineStorePage, using fallback products:', err);
  }

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

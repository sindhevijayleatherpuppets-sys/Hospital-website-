import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  let images: any[] = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching gallery images from database:', err);
  }

  return (
    <div className="animate-fade-in container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>Treatment Gallery</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-2xl)' }}>
        Glimpses into our holistic healing processes and facilities.
      </p>

      {images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>No images uploaded yet. The hospital staff will add treatment process pictures here soon.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {images.map((image) => (
            <div key={image.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', paddingBottom: '75%', backgroundColor: 'var(--color-secondary-light)', position: 'relative' }}>
                {image.url ? (
                  <img src={image.url} alt={image.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--color-primary-dark)', fontSize: '0.9rem' }}>
                    [Image: {image.title}]
                  </span>
                )}
              </div>
              <div style={{ padding: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xs)' }}>{image.title}</h3>
                {image.description && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{image.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { signupPatient } from './actions';

interface SignupPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const error = params?.error;

  const getErrorMessage = (errCode?: string) => {
    switch (errCode) {
      case 'EmailTaken':
        return 'An account with this email address is already registered. Please sign in instead.';
      case 'PasswordTooShort':
        return 'Password is too short. Please choose a password with at least 6 characters.';
      case 'MissingFields':
        return 'Please fill in your name, email address, and password.';
      default:
        return null;
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
      <div 
        className="card animate-fade-in" 
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          width: '100%', 
          maxWidth: '430px', 
          borderTop: '4px solid var(--color-nav)',
          boxShadow: '0 20px 40px -10px rgba(61, 112, 82, 0.15)',
          padding: 'var(--spacing-2xl) var(--spacing-xl)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <div className="animate-float" style={{ display: 'inline-block', marginBottom: 'var(--spacing-xs)' }}>
            <img 
              src="/images/logo.png" 
              alt="Dhanvanthari Hospital Logo" 
              style={{ 
                width: '72px', 
                height: '72px', 
                borderRadius: 'var(--radius-lg)', 
                objectFit: 'contain',
                boxShadow: '0 8px 16px rgba(45, 90, 60, 0.12)' 
              }} 
            />
          </div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-nav)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Dhanvanthari Ayurveda
          </span>
          <h1 style={{ fontSize: '1.8rem', margin: '4px 0', color: 'var(--color-primary-dark)' }}>
            Patient Registration
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Create an account to book consultations and access digital care
          </p>
        </div>

        {errorMessage && (
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
            ⚠️ {errorMessage}
          </div>
        )}
        
        <form action={signupPatient}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input 
              className="form-input" 
              type="text" 
              id="name" 
              name="name" 
              placeholder="e.g. John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              className="form-input" 
              type="email" 
              id="email" 
              name="email" 
              placeholder="e.g. name@example.com"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Create Password</label>
            <input 
              className="form-input" 
              type="password" 
              id="password" 
              name="password" 
              placeholder="At least 6 characters"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary animate-pulse-glow" 
            style={{ 
              width: '100%', 
              marginTop: 'var(--spacing-md)', 
              padding: '0.75rem', 
              fontSize: '1rem',
              backgroundColor: 'var(--color-nav)' 
            }}
          >
            Complete Registration →
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', textAlign: 'center', fontSize: '0.9rem' }}>
          <p style={{ margin: 0 }}>
            Already have an account? <Link href="/auth/login" style={{ fontWeight: 600, color: 'var(--color-nav)' }}>Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { loginPatient } from './actions';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params?.error;

  const getErrorMessage = (errCode?: string) => {
    switch (errCode) {
      case 'InvalidCredentials':
        return 'Invalid email address or password. Please check your credentials and try again.';
      case 'MissingFields':
        return 'Please enter both your email address and password.';
      default:
        return null;
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
      {/* Main Glassmorphism Card */}
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
        {/* Hospital Logo Header with gentle float animation */}
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
            Patient Portal
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Sign in to book consultations and view your digital prescriptions
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

        <form action={loginPatient}>
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
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              className="form-input" 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your account password"
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
            Sign In to Patient Portal →
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', textAlign: 'center', fontSize: '0.9rem' }}>
          <p style={{ marginBottom: 'var(--spacing-xs)' }}>
            New patient? <Link href="/auth/signup" style={{ fontWeight: 600, color: 'var(--color-nav)' }}>Register an Account</Link>
          </p>
          <p style={{ margin: 0 }}>
            Hospital staff? <Link href="/auth/staff-login" style={{ fontWeight: 600, color: 'var(--color-nav)' }}>Doctor & Receptionist Portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

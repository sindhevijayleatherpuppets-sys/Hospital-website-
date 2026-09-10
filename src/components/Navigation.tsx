'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { logoutAction } from '@/app/actions/auth';

interface NavigationProps {
  session?: { userId: string; role: string } | null;
}

export default function Navigation({ session }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardUrl = () => {
    if (!session) return '/auth/login';
    if (session.role === 'DOCTOR') return '/dashboard/doctor';
    if (session.role === 'RECEPTIONIST') return '/dashboard/receptionist';
    return '/dashboard/patient';
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav 
      aria-label="Main Navigation"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--spacing-md) var(--spacing-xl)',
        backgroundColor: isScrolled ? 'var(--color-nav-scrolled)' : 'var(--color-nav)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isScrolled ? '0 4px 20px rgba(45, 90, 60, 0.18)' : '0 2px 10px rgba(45, 90, 60, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all var(--transition-normal)'
      }}
    >
      {/* Brand Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }} onClick={closeMobileMenu}>
        <img 
          src="/images/logo.png" 
          alt="Hospital Logo" 
          style={{ 
            height: '42px', 
            width: 'auto',
            borderRadius: 'var(--radius-md)',
            objectFit: 'contain'
          }} 
        />
        <span style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.45rem', 
          fontWeight: 600,
          color: '#ffffff',
          whiteSpace: 'nowrap'
        }}>
          Dhanvanthari
        </span>
      </Link>
      
      {/* Desktop Navigation Links */}
      <div className="desktop-nav" style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
        <Link href="/services" className="nav-link">Services</Link>
        <Link href="/catalog" className="nav-link">Catalogs</Link>
        <Link href="/medicine-store" className="nav-link">Medicine Store</Link>
        <Link href="/about" className="nav-link">About Us</Link>
        <Link href="/gallery" className="nav-link">Gallery</Link>
        <Link href="/location" className="nav-link">Location</Link>

        {session ? (
          /* When logged in */
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <Link 
              href={getDashboardUrl()} 
              className="btn" 
              style={{ 
                padding: '0.45rem 1.1rem',
                backgroundColor: '#ffffff',
                color: 'var(--color-primary)',
                fontWeight: 600,
                borderRadius: 'var(--radius-full)',
                transition: 'all var(--transition-normal)',
                whiteSpace: 'nowrap',
                textDecoration: 'none'
              }}
            >
              My Dashboard
            </Link>

            <form action={logoutAction} style={{ margin: 0 }}>
              <button 
                type="submit" 
                className="btn" 
                style={{ 
                  padding: '0.45rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  whiteSpace: 'nowrap'
                }}
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          /* When NOT logged in */
          <Link 
            href="/auth/login" 
            className="btn" 
            style={{ 
              padding: '0.45rem 1.1rem',
              backgroundColor: '#ffffff',
              color: 'var(--color-primary)',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              transition: 'all var(--transition-normal)',
              whiteSpace: 'nowrap',
              textDecoration: 'none'
            }}
          >
            Login / Book
          </Link>
        )}
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-md)',
          color: '#ffffff',
          fontSize: '1.4rem',
          padding: '6px 10px',
          cursor: 'pointer'
        }}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--color-nav-scrolled)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            padding: 'var(--spacing-lg) var(--spacing-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)',
            zIndex: 99
          }}
        >
          <Link href="/services" className="nav-link" onClick={closeMobileMenu}>Services</Link>
          <Link href="/catalog" className="nav-link" onClick={closeMobileMenu}>Catalogs</Link>
          <Link href="/medicine-store" className="nav-link" onClick={closeMobileMenu}>Medicine Store</Link>
          <Link href="/about" className="nav-link" onClick={closeMobileMenu}>About Us</Link>
          <Link href="/gallery" className="nav-link" onClick={closeMobileMenu}>Gallery</Link>
          <Link href="/location" className="nav-link" onClick={closeMobileMenu}>Location</Link>

          <div style={{ paddingTop: 'var(--spacing-sm)', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {session ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                <Link 
                  href={getDashboardUrl()} 
                  className="btn" 
                  onClick={closeMobileMenu}
                  style={{ 
                    padding: '0.6rem 1rem',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}
                >
                  My Dashboard
                </Link>

                <form action={logoutAction} style={{ margin: 0 }}>
                  <button 
                    type="submit" 
                    className="btn" 
                    style={{ 
                      width: '100%',
                      padding: '0.6rem 1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="btn" 
                onClick={closeMobileMenu}
                style={{ 
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.6rem 1rem',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Login / Book Consultation
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

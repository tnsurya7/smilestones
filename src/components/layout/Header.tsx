'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Programs', href: '/programs' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Static Apple Dock Style Navigation */}
      <nav className="static-dock-nav">
        <div className="dock-container">
          {/* Logo - Left Side */}
          <div className="dock-logo">
            <Link href="/" className="logo-link">
              <div className="logo-wrapper">
                <img 
                  src="/smilestones-logo.jpeg" 
                  alt="Smilestones Logo" 
                  className="logo-image"
                />
              </div>
              <span className="logo-text">Smilestones</span>
            </Link>
          </div>

          {/* Desktop Navigation Items - Center */}
          <div className="nav-items-container">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`dock-nav-item ${pathname === item.href ? 'active' : ''}`}
              >
                <span className="nav-text">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Menu Button - ONLY VISIBLE ON MOBILE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Desktop CTA Button - Right Side */}
          <div className="cta-wrapper">
            <Link href="/contact" className="static-cta-btn">
              <span className="btn-text">Book Now</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu - ONLY RENDER ON MOBILE */}
      {isMobileMenuOpen && typeof window !== 'undefined' && window.innerWidth <= 1024 && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Sidebar */}
          <div className="mobile-menu-sidebar">
            <div className="mobile-menu-content">
              {/* Mobile Menu Header */}
              <div className="mobile-menu-header">
                <div className="flex items-center gap-3">
                  <div className="logo-wrapper">
                    <img 
                      src="/smilestones-logo.jpeg" 
                      alt="Smilestones Logo" 
                      className="logo-image"
                    />
                  </div>
                  <span className="logo-text">Smilestones</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-menu-close"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="mobile-nav-items">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-text">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <div className="mobile-cta-wrapper">
                <Link 
                  href="/contact" 
                  className="mobile-cta-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="btn-text">Book Appointment</span>
                </Link>
              </div>

              {/* Mobile Contact Icons */}
              <div className="mobile-contact-icons">
                <a 
                  href="tel:+919876543210" 
                  className="mobile-contact-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </a>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-contact-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Programs', href: '/programs' },
    { name: 'Milestones', href: '/milestones' },
    { name: 'Our Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      {/* Top bar with contact info */}
      <div className="bg-gray-50 border-b border-gray-100 py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+919876543210" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Phone size={14} />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@smilestones.com" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Mail size={14} />
              <span>info@smilestones.com</span>
            </a>
          </div>
          <div className="hidden lg:block">
            <span className="text-gray-600 font-medium">Helping Children Reach Their Full Potential</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Square aspect ratio as required */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <img 
              src="/smilestones-logo.jpeg" 
              alt="Smilestones Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain border-radius-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Smilestones</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Child Development Centre</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors relative text-sm xl:text-base ${
                  pathname === item.href 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link href="/contact" className="btn-primary text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 glass-card p-4 md:p-6">
            <div className="flex flex-col space-y-3 md:space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium py-2 transition-colors text-base ${
                    pathname === item.href 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-primary mt-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
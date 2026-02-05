import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const branches = [
    {
      name: 'Chennai - Anna Nagar',
      address: '123 Anna Nagar, Chennai - 600040',
      phone: '+91 9445051166',
    },
    {
      name: 'Chennai - Trustpuram',
      address: '456 Trustpuram, Chennai - 600024',
      phone: '+91 98765 43211',
    },
    {
      name: 'Puducherry',
      address: '789 Main Road, Puducherry - 605001',
      phone: '+91 98765 43212',
    },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Programs', href: '/programs' },
    { name: 'Our Team', href: '/team' },
    { name: 'Milestones', href: '/milestones' },
    { name: 'Career', href: '/career' },
  ];

  const services = [
    { name: 'Autism Therapy', href: '/services/autism-therapy' },
    { name: 'Speech Therapy', href: '/services/speech-therapy' },
    { name: 'ABA Therapy', href: '/services/aba-therapy' },
    { name: 'Occupational Therapy', href: '/services/occupational-therapy' },
    { name: 'ADHD Support', href: '/services/adhd-support' },
    { name: 'Learning Disabilities', href: '/services/learning-disabilities' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 via-yellow-400 via-green-400 to-blue-500"></div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/smilestones-logo.jpeg" 
                  alt="Smilestones Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Smilestones</h3>
                <p className="text-sm text-gray-300">Child Development Centre</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional child development centre helping children reach their full potential through evidence-based therapies and support.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Youtube size={20} />
              </a>
            </div>

            {/* Admin Access Button */}
            <div className="mt-6">
              <Link 
                href="/admin/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:to-green-300 hover:bg-clip-text transition-all duration-300">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Contact Info</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">Main Office</p>
                  <a href="tel:+919445051166" className="text-white hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                    +91 9445051166
                  </a>
                </div>
                <div>
                  <p className="text-gray-300">Secondary</p>
                  <a href="tel:+918300230491" className="text-white hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                    +91 8300230491
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">Email</p>
                  <a href="mailto:info@smilestones.com" className="text-white hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                    info@smilestones.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">Working Hours</p>
                  <p className="text-white">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-white">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branches */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">Our Locations</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <div key={branch.name} className={`gradient-card ${
                index === 0 ? 'gradient-card-blue' : 
                index === 1 ? 'gradient-card-green' : 'gradient-card-red'
              } relative overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h5 className="font-bold text-white mb-2">{branch.name}</h5>
                  <div className="flex items-start space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-white/80 mt-1 flex-shrink-0" />
                    <p className="text-white/90 text-sm">{branch.address}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-white/80" />
                    <a href={`tel:${branch.phone}`} className="text-white/90 text-sm hover:text-white transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-6 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2026 Smilestones Child Development Centre. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm justify-center md:justify-end">
              <Link href="/privacy" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 hover:bg-clip-text transition-all duration-300">
                Sitemap
              </Link>
              <Link href="/admin/login" className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 font-semibold">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
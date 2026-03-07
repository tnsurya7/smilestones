'use client';

import { Phone, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showClosedMessage, setShowClosedMessage] = useState(false);

  // Check if current time is within business hours (9 AM to 6 PM)
  const isWithinBusinessHours = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 9 && hours < 18; // 9 AM to 6 PM
  };

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isWithinBusinessHours()) {
      e.preventDefault();
      setShowClosedMessage(true);
      setTimeout(() => setShowClosedMessage(false), 4000);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Closed Message Toast */}
      {showClosedMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-32 right-6 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 max-w-sm"
        >
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm mb-1">We're Currently Closed</p>
              <p className="text-xs">Our calling hours are 9:00 AM to 6:00 PM. We'll be happy to call you back during business hours!</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div 
        className="floating-buttons-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {/* WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
          className="relative group"
        >
          <motion.a
            href="https://wa.me/919445051166?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services%20for%20my%20child."
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn floating-btn-whatsapp text-white relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact us on WhatsApp"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <MessageCircle size={26} strokeWidth={2} />
            </motion.div>
            <div className="floating-btn-tooltip">
              Chat on WhatsApp
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </motion.a>
        </motion.div>

        {/* Phone Call Button */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.2 }}
          className="relative group"
        >
          <motion.a
            href="tel:+919445051166"
            onClick={handleCallClick}
            className={`floating-btn floating-btn-phone text-white relative overflow-hidden ${!isWithinBusinessHours() ? 'opacity-75' : ''}`}
            whileHover={{ scale: 1.1, rotate: [0, 15, -15, 0] }}
            whileTap={{ scale: 0.95 }}
            aria-label="Call us now"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            >
              <Phone size={26} strokeWidth={2} />
            </motion.div>
            <div className="floating-btn-tooltip">
              {isWithinBusinessHours() 
                ? 'Call Now: +91 9445051166' 
                : 'Closed (9 AM - 6 PM)'}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </motion.a>
        </motion.div>

        {/* Facebook Button */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.4 }}
          className="relative group"
        >
          <motion.a
            href="https://www.facebook.com/share/17Gd3KMWj6/"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn floating-btn-facebook text-white relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            aria-label="Follow us on Facebook"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <Facebook size={26} strokeWidth={2} fill="currentColor" />
            </motion.div>
            <div className="floating-btn-tooltip">
              Follow on Facebook
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </motion.a>
        </motion.div>

        {/* Instagram Button */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.6 }}
          className="relative group"
        >
          <motion.a
            href="https://www.instagram.com/smilestonescdc?igsh=MThoc3dkYWxlMTNxeA=="
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn floating-btn-instagram text-white relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
            aria-label="Follow us on Instagram"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut"
              }}
            >
              <Instagram size={26} strokeWidth={2} />
            </motion.div>
            <div className="floating-btn-tooltip">
              Follow on Instagram
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </motion.a>
        </motion.div>

        {/* Floating indicator dots */}
        <motion.div 
          className="absolute -top-2 -right-2 flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingButtons;
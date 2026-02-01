'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
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
          href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services%20for%20my%20child."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-btn-whatsapp text-white relative overflow-hidden"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact us on WhatsApp"
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Icon with subtle animation */}
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
          
          {/* Tooltip */}
          <div className="floating-btn-tooltip">
            Chat on WhatsApp
          </div>
          
          {/* Shine effect */}
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
          href="tel:+919876543210"
          className="floating-btn floating-btn-phone text-white relative overflow-hidden"
          whileHover={{ scale: 1.1, rotate: [0, 15, -15, 0] }}
          whileTap={{ scale: 0.95 }}
          aria-label="Call us now"
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Icon with subtle animation */}
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
          
          {/* Tooltip */}
          <div className="floating-btn-tooltip">
            Call Now: +91 98765 43210
          </div>
          
          {/* Shine effect */}
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
  );
};

export default FloatingButtons;
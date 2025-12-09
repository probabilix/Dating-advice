import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="footer-content">
        <div className="footer-logo">
          DatingAdvice.<span className="logo-io">io</span>
        </div>
        
        <div className="footer-links">
          <h4>Legal</h4>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
        
        <div className="footer-links">
          <h4>Connect</h4>
          <a href="mailto:support@datingadvice.io">Support</a>
          <a href="/faq">FAQ</a>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} DatingAdvice.io. All rights reserved. 
          <span className="ai-note"> | AI Coaching, not therapy.</span>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
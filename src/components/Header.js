import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext'; // Import the context
import './Header.css'; 

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use the context

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
  };

  return (
    <motion.header
      className="header"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="logo">
        <span className="logo-dot"></span>
        DatingAdvice.<span className="logo-io">io</span>
      </div>
      <nav className="nav-links">
        <a href="#topics">Topics</a>
        <a href="#how-it-works">How It Works</a>
        
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? '☀️ Light Mode' : '🌑 Dark Mode'}
        </button>
      </nav>
    </motion.header>
  );
};

export default Header;
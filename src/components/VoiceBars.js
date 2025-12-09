import React from 'react';
import { motion } from 'framer-motion';
import './VoiceBars.css';

const barVariants = {
  start: { scaleY: 1 },
  end: { scaleY: 0.4 } // Reduced scaleY for a less jarring animation
};

const VoiceBars = () => {
  const barCount = 8; // Slightly fewer bars for better spacing
  
  return (
    <div className="voice-bars-container">
      {[...Array(barCount)].map((_, index) => (
        <motion.div
          key={index}
          className="voice-bar"
          variants={barVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: index * 0.1, 
          }}
        />
      ))}
    </div>
  );
};

export default VoiceBars;
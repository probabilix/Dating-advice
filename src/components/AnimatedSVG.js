import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSVG = ({ isSpeaking }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15, delay: 0.5 } },
  };

  // Animation for the central microphone icon (pulse when speaking)
  const coreAnimation = isSpeaking
    ? { scale: [1, 1.15, 1], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } }
    : { scale: 1 };

  // Animation for the outer signal waves
  const waveVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    // Perpetual "breathing" animation on the wave path
    breathe: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="agent-svg"
    >
      {/* 1. Outer Wave (Signal) */}
      <motion.circle
        cx="100" cy="100" r="95" 
        stroke={isSpeaking ? "url(#gradientSpeaking)" : "url(#gradientIdle)"}
        strokeWidth="2" 
        variants={waveVariants}
        animate={isSpeaking ? "breathe" : "animate"}
      />
      
      {/* 2. Inner Wave (Mind/Thought) */}
      <motion.path 
        d="M50 100 Q 75 80, 100 100 T 150 100" 
        stroke={isSpeaking ? "#fff" : "#ff6b6b"} 
        strokeWidth="3"
        strokeLinecap="round"
        variants={waveVariants}
        transition={{ delay: 0.2, duration: 2 }}
        animate={isSpeaking ? { y: [0, -5, 0] } : {}} // Small float when speaking
      />

      {/* 3. Gradient Definition */}
      <defs>
        <linearGradient id="gradientIdle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#3a3a6a", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#ff6b6b", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gradientSpeaking" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#ff6b6b", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* 4. Core (The Microphone/Voice icon) */}
      <motion.circle 
        cx="100" cy="100" r="30" 
        fill="#ff6b6b" 
        animate={coreAnimation} 
        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.8))' }}
      />
      
      <text x="100" y="105" textAnchor="middle" fill="#101025" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          AI
      </text>

    </motion.svg>
  );
};

export default AnimatedSVG;
import React from 'react';
import { motion } from 'framer-motion';
import './AdviceSection.css';
import { adviceTopics } from '../data/adviceTopics';

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const AdviceSection = () => {
  return (
    <section className="advice-section" id="topics">
      <h2 className="section-heading">Our Core Advice Pillars</h2>
      <p className="section-subtext">Practical, empathetic guidance for every step of your journey.</p>
      
      <motion.div 
        className="advice-grid"
        initial="hidden"
        whileInView="visible" // Animation triggers when section scrolls into view
        viewport={{ once: true, amount: 0.2 }} // Only animate once, when 20% visible
        variants={containerVariants}
      >
        {adviceTopics.map((topic, index) => (
          <motion.div 
            className="advice-card" 
            key={index}
            variants={cardVariants}
          >
            <div className="card-icon">{topic.icon}</div>
            <h3 className="card-title">{topic.title}</h3>
            <p className="card-description">{topic.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AdviceSection;
// (Keep the existing AdviceSection.css)
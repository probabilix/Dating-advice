import React from 'react';
import './App.css'; // Global styles
import Header from './components/Header';
import VoiceAgent from './components/VoiceAgent';
import DetailedInput from './components/DetailedInput';
import AdviceSection from './components/AdviceSection';
import Footer from './components/Footer'; // Simple component

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        {/* Section 1: Hero & Agent */}
        <VoiceAgent />
        
        {/* Section 2: Detailed Inputs (High-Impact Demo) */}
        <DetailedInput />
        
        {/* Section 3: Advice Pillars (Scroll Animation) */}
        <AdviceSection />

        {/* Section 4: Pricing Plans */}
        <PricingPlans />
    
        {/* Section 4: Call to Action / Footer */}
      </main>
      <Footer />
    </div>
  );
}

export default App;

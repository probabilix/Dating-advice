import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './PricingPlans.css';

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    starter: {
      name: 'Starter',
      monthlyPrice: 49,
      yearlyPrice: 490,
      description: 'Perfect for getting started',
      icon: '🌱',
      features: [
        { name: 'Chat Messages', value: '5000/month', included: true },
        { name: 'Voice Minutes', value: '80 min/month', included: true },
        { name: 'Response Time', value: 'Standard', included: true },
        { name: 'Advanced Analytics', value: '', included: false },
        { name: 'Priority Support', value: '', included: false },
        { name: 'Custom AI Personality', value: '', included: false },
      ],
      monthlyMinutes: 30,
      costBreakdown: { vapi: '$15', gemini: '$15', markup: '$19' }
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 129,
      yearlyPrice: 1290,
      description: 'Most popular choice',
      icon: '⭐',
      features: [
        { name: 'Chat Messages', value: '15000/month', included: true },
        { name: 'Voice Minutes', value: '200 min/month', included: true },
        { name: 'Response Time', value: 'Fast (< 2s)', included: true },
        { name: 'Advanced Analytics', value: 'Full Dashboard', included: true },
        { name: 'Priority Support', value: '24/7 Support', included: true },
        { name: 'Custom AI Personality', value: '', included: false },
      ],
      monthlyMinutes: 120,
      costBreakdown: { vapi: '$60', gemini: '$45', markup: '$24' }
    },
    premium: {
      name: 'Premium',
      monthlyPrice: 249,
      yearlyPrice: 2490,
      description: 'For power users',
      icon: '👑',
      features: [
        { name: 'Chat Messages', value: 'Unlimited', included: true },
        { name: 'Voice Minutes', value: '450 min/month', included: true },
        { name: 'Response Time', value: 'Ultra-fast (< 1s)', included: true },
        { name: 'Advanced Analytics', value: 'Full Dashboard + Insights', included: true },
        { name: 'Priority Support', value: 'Dedicated Manager', included: true },
        { name: 'Custom AI Personality', value: 'Yes', included: true },
      ],
      monthlyMinutes: 300,
      costBreakdown: { vapi: '$150', gemini: '$100', markup: '-$1' }
    },
  };

  const currentPlan = plans[selectedPlan];
  const price = billingCycle === 'monthly' ? currentPlan.monthlyPrice : currentPlan.yearlyPrice;
  const savings = billingCycle === 'yearly' ? Math.round((currentPlan.monthlyPrice * 12 - currentPlan.yearlyPrice) / (currentPlan.monthlyPrice * 12) * 100) : 0;

  return (
    <motion.section 
      className="pricing-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="pricing-header">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the plan that fits your relationship journey</p>
        
        <div className="billing-toggle">
          <button 
            className={billingCycle === 'monthly' ? 'active' : ''} 
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={billingCycle === 'yearly' ? 'active' : ''} 
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            {savings > 0 && <span className="savings-badge">Save {savings}%</span>}
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {Object.entries(plans).map(([key, plan]) => {
          const cardPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          return (
            <motion.div
              key={key}
              className={`pricing-card ${selectedPlan === key ? 'selected' : ''}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlan(key)}
              layout
            >
              {key === 'pro' && <div className="popular-badge">Most Popular</div>}
              
              <div className="plan-icon">{plan.icon}</div>
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              
              <div className="price-display">
                <span className="currency">$</span>
                <span className="amount">{cardPrice}</span>
                <span className="period">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>

            <button className="cta-button">Get Started</button>

            <div className="features-list">
              {plan.features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  className={`feature ${feature.included ? 'included' : 'excluded'}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="feature-check">
                    {feature.included ? '✓' : '✗'}
                  </span>
                  <span className="feature-name">{feature.name}</span>
                  <span className="feature-value">{feature.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="plan-info">
              <p className="voice-minutes">
                <strong>{plan.monthlyMinutes} min/month</strong> of voice coaching
              </p>
              <p className="info-text">
                That's approximately <strong>{Math.round(plan.monthlyMinutes / 4)}</strong> sessions per week
              </p>
            </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Cost Breakdown */}
      <motion.div 
        className="cost-breakdown-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3>Pricing Breakdown: {currentPlan.name} Plan</h3>
        
        <div className="breakdown-container">
          <div className="breakdown-chart">
            <div className="chart-bars">
              <motion.div 
                className="bar vapi-cost"
                layoutId="vapi-bar"
                transition={{ duration: 0.5 }}
              >
                <span className="bar-label">Voice Service (VAPI)</span>
                <span className="bar-value">{currentPlan.costBreakdown.vapi}</span>
              </motion.div>
              <motion.div 
                className="bar gemini-cost"
                layoutId="gemini-bar"
                transition={{ duration: 0.5 }}
              >
                <span className="bar-label">AI Responses (Gemini)</span>
                <span className="bar-value">{currentPlan.costBreakdown.gemini}</span>
              </motion.div>
              <motion.div 
                className="bar markup-cost"
                layoutId="markup-bar"
                transition={{ duration: 0.5 }}
              >
                <span className="bar-label">Operations & Profit Margin</span>
                <span className="bar-value">{currentPlan.costBreakdown.markup}</span>
              </motion.div>
            </div>
            <div className="chart-total">
              <span>Total Monthly: ${currentPlan.monthlyPrice}</span>
            </div>
          </div>

          <div className="breakdown-details">
            <div className="detail-item vapi">
              <h4>🎤 Voice Service</h4>
              <p>VAPI voice minutes powered by real AI conversations</p>
              <span className="detail-value">{currentPlan.costBreakdown.vapi}/month</span>
            </div>
            <div className="detail-item gemini">
              <h4>🤖 AI Intelligence</h4>
              <p>Gemini powered responses and advice generation</p>
              <span className="detail-value">{currentPlan.costBreakdown.gemini}/month</span>
            </div>
            <div className="detail-item markup">
              <h4>⚙️ Operations</h4>
              <p>Server maintenance, support, and platform development</p>
              <span className="detail-value">{currentPlan.costBreakdown.markup}/month</span>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h4>Common Questions</h4>
          <div className="faq-items">
            <div className="faq-item">
              <p><strong>Can I upgrade/downgrade anytime?</strong></p>
              <p className="answer">Yes! Change your plan anytime. We'll prorate charges based on your usage.</p>
            </div>
            <div className="faq-item">
              <p><strong>What happens to unused minutes?</strong></p>
              <p className="answer">Minutes reset monthly. Unused minutes don't roll over, but Starter/Pro plans include rollover with yearly subscription.</p>
            </div>
            <div className="faq-item">
              <p><strong>Is there a free trial?</strong></p>
              <p className="answer">Yes! Get 10 free minutes of voice coaching and 50 chat messages to start.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="pricing-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3>Ready to transform your love life?</h3>
        <p>Start with 10 free voice minutes and 50 chat messages—no credit card required</p>
        <button className="primary-cta">Start Your Free Trial</button>
      </motion.div>
    </motion.section>
  );
};

export default PricingPlans;

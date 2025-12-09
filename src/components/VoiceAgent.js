import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSVG from './AnimatedSVG'; // Import the new SVG
import VoiceBars from './VoiceBars'; // For the speaking animation
import { initializeVapi, startVapiCall, stopVapiCall } from '../services/vapiService'; // VAPI SDK functions
import './VoiceAgent.css';

const VoiceAgent = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');
  const [vapiCallId, setVapiCallId] = React.useState(null);
  const [vapiActive, setVapiActive] = React.useState(false);
  const vapiInitializedRef = React.useRef(false);

  // Initialize VAPI on component mount
  React.useEffect(() => {
    const vapiPublicKey = process.env.REACT_APP_VAPI_PUBLIC_KEY;
    
    if (vapiPublicKey && !vapiInitializedRef.current) {
      try {
        initializeVapi(vapiPublicKey);
        vapiInitializedRef.current = true;
        console.log('VAPI initialized successfully');
      } catch (error) {
        console.error('Failed to initialize VAPI:', error);
      }
    }
  }, []);

  /**
   * Start VAPI voice call
   */
  const handleStartListening = async () => {
    setIsListening(true);
    setTranscript('🎤 Connecting...');

    try {
      const assistantId = process.env.REACT_APP_VAPI_ASSISTANT_ID;
      if (!assistantId) {
        throw new Error('VAPI_ASSISTANT_ID not configured');
      }

      await startVapiCall({
        assistantId,
        onMessage: (msg) => {
          console.log('Message:', msg);
          setTranscript(msg?.message || 'Response received');
          setIsSpeaking(true);
        },
        onError: (error) => {
          console.error('Error:', error);
          setTranscript(`❌ Error: ${error?.message || 'Error occurred'}`);
        },
        onEnd: () => {
          console.log('Call ended');
          setIsSpeaking(false);
          setIsListening(false);
          setVapiActive(false);
          setTranscript('✅ Call ended');
        }
      });

      setVapiCallId('active');
      setVapiActive(true);
      setTranscript('🎤 Call started. Speak now...');
      setIsSpeaking(true);

    } catch (error) {
      console.error('Error:', error);
      setTranscript(`❌ Error: ${error.message}`);
      setIsListening(false);
    }
  };

  /**
   * End VAPI voice call
   */
  const handleEndListening = async () => {
    if (!vapiCallId) return;
    try {
      setTranscript('📞 Ending...');
      await stopVapiCall();
      setVapiCallId(null);
      setVapiActive(false);
      setIsListening(false);
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error:', error);
      setTranscript(`❌ Error: ${error.message}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.4 } },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }, 
  };

  return (
    <div className="agent-hero-section">
      {/* Background radial gradient gives the cosmic feel */}
      <div className="cosmic-backdrop"></div> 

      <motion.div
        className="agent-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="agent-title" variants={itemVariants}>
          Talk to Clarity.<span className="logo-io"> Talk to Love.</span>
        </motion.h1>
        
        <motion.p className="agent-subtitle" variants={itemVariants}>
          Your Personal AI Relationship Strategist is ready.
        </motion.p>
        
        {/* New SVG Centerpiece */}
        <motion.div
          className="agent-svg-wrapper"
          variants={itemVariants}
          transition={{ duration: 0.8, type: 'spring', delay: 0.5 }}
          onClick={vapiActive ? handleEndListening : handleStartListening}
          style={{ cursor: vapiInitializedRef.current ? 'pointer' : 'default' }}
          whileHover={{ scale: vapiInitializedRef.current ? 1.05 : 1 }}
          whileTap={{ scale: vapiInitializedRef.current ? 0.95 : 1 }}
        >
          <AnimatedSVG isSpeaking={isSpeaking || isListening} />
        </motion.div>
        
        {/* Speaking Display */}
        <motion.div 
          className="speaking-display"
          // Conditional animation based on active state
          initial={{ height: 0, opacity: 0 }}
          animate={vapiActive || isListening ? { height: 'auto', opacity: 1, transition: { duration: 0.5 } } : { height: 0, opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="speech-feedback">
            {(isSpeaking || isListening) && <VoiceBars />} 
            <motion.p 
                key={transcript} 
                className="transcript-text" 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {transcript || 'Awaiting response...'}
            </motion.p>
            {vapiActive && (
              <button 
                onClick={handleEndListening}
                className="end-call-button"
              >
                End Call
              </button>
            )}
          </div>

          {!vapiActive && !isListening && (
            <p className="instruction-text">Click the core to start speaking...</p>
          )}
        </motion.div>


        <motion.div className="agent-features" variants={itemVariants}>
          <div className="feature">
            <span className="feature-icon">🎙️</span>
            <span>Voice Chat</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🤖</span>
            <span>AI-Powered</span>
          </div>
          <div className="feature">
            <span className="feature-icon">❤️</span>
            <span>Always Supportive</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VoiceAgent;
/**
 * VAPI Voice Assistant Integration Service
 * Simple wrapper for VAPI SDK v1.0.100
 */

import Vapi from '@vapi-ai/web';

let vapi = null;

/**
 * Initialize VAPI
 */
export const initializeVapi = (publicKey) => {
  try {
    if (!vapi) {
      vapi = new Vapi(publicKey);
      console.log('✅ VAPI initialized');
    }
    return vapi;
  } catch (error) {
    console.error('❌ Failed to init VAPI:', error);
    throw error;
  }
};

/**
 * Start voice call
 */
export const startVapiCall = async (options = {}) => {
  try {
    if (!vapi) throw new Error('VAPI not initialized');

    const { assistantId, onMessage, onError, onEnd } = options;

    // Setup listeners
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('call-end', onEnd);

    console.log('🎤 Starting call...');
    await vapi.start(assistantId);
  } catch (error) {
    console.error('❌ Start call error:', error);
    throw error;
  }
};

/**
 * Stop voice call
 */
export const stopVapiCall = async () => {
  try {
    if (vapi) {
      console.log('⏹️ Stopping call...');
      await vapi.stop();
    }
  } catch (error) {
    console.error('❌ Stop call error:', error);
    throw error;
  }
};

/**
 * Get VAPI instance
 */
export const getVapiInstance = () => vapi;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  initializeVapi,
  startVapiCall,
  stopVapiCall,
  getVapiInstance,
};

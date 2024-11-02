// src/utils/logger.js
function logDebug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.log("[DEBUG]", message, data || "");
    }
  }
  
  function logError(message, error = null) {
    console.error("[ERROR]", message, error ? error.message : "");
  }
  
  module.exports = { logDebug, logError };
  
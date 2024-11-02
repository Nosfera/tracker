// src/auth/firebaseAuth.js
const { auth } = require('../firebase');
const logger = require('../utils/logger');

// Middleware for authenticating user requests
async function authenticateUser(req, res, next) {
  const userToken = req.headers.authorization;
  if (!userToken) {
    logger.logDebug("No authorization header provided.");
    return res.status(401).json({ message: 'Authorization required' });
  }

  try {
    const user = await auth.verifyIdToken(userToken);
    req.user = user;
    logger.logDebug("User authenticated", user.uid);
    next();
  } catch (error) {
    logger.logError("Authentication failed", error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { authenticateUser };

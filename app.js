// app.js
const express = require('express');
const app = express();
const logger = require('./src/utils/logger');
app.use(express.json());

const priceRoutes = require('./src/routes/priceRoutes');
const shareRoutes = require('./src/routes/shareRoutes');

// Log all incoming requests for traceability
app.use((req, res, next) => {
  logger.logDebug(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/prices', priceRoutes);
app.use('/api/share', shareRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.logError("Unhandled error", err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.logDebug(`Server running on port ${PORT}`));

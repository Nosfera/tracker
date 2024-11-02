// src/routes/shareRoutes.js
const express = require('express');
const router = express.Router();
const { createShareLink, getSharedProduct } = require('../services/shareService');
const { authenticateUser } = require('../auth/firebaseAuth');

router.post('/share-product', authenticateUser, async (req, res) => {
  const { productId } = req.body;
  const token = await createShareLink(req.user.uid, productId);
  res.json({ shareLink: `${req.protocol}://${req.get('host')}/share/${token}` });
});

router.get('/share/:token', async (req, res) => {
  const product = await getSharedProduct(req.params.token);
  product ? res.json(product) : res.status(404).send('Invalid link');
});

module.exports = router;

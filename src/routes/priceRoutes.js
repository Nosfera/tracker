// src/routes/priceRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, getUserProducts } = require('../services/priceService');
const { authenticateUser } = require('../auth/firebaseAuth');

router.post('/add-product', authenticateUser, async (req, res) => {
  const { productData } = req.body;
  await addProduct(req.user.uid, productData);
  res.status(200).send('Product added');
});

router.get('/products', authenticateUser, async (req, res) => {
  const products = await getUserProducts(req.user.uid);
  res.json(products);
});

module.exports = router;

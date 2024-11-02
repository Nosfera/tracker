// src/services/priceService.js
const { db } = require('../firebase');
const logger = require('../utils/logger');

async function addProduct(userId, productData) {
  try {
    const userRef = db.collection('users').doc(userId);
    const trackedProducts = userRef.collection('trackedProducts');
    await trackedProducts.add(productData);
    logger.logDebug("Product added successfully for user", { userId, productData });
  } catch (error) {
    logger.logError("Failed to add product", error);
    throw error;
  }
}

async function getUserProducts(userId) {
  try {
    const productsSnapshot = await db.collection('users').doc(userId).collection('trackedProducts').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    logger.logDebug("Fetched user products", products);
    return products;
  } catch (error) {
    logger.logError("Failed to fetch user products", error);
    throw error;
  }
}

module.exports = { addProduct, getUserProducts };

// src/services/shareService.js
const { db } = require('../firebase');
const { v4: uuidv4 } = require('uuid');

// Generate a shareable link
async function createShareLink(userId, productId) {
  const token = uuidv4();
  await db.collection('users').doc(userId).collection('sharedTokens').doc(token).set({ productId });
  return token;
}

// Retrieve shared product data
async function getSharedProduct(token) {
  const sharedDoc = await db.collectionGroup('sharedTokens').where('token', '==', token).get();
  return sharedDoc.empty ? null : sharedDoc.docs[0].data();
}

module.exports = { createShareLink, getSharedProduct };

// src/firebase.js
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
const logger = require('./utils/logger');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

const db = firebase.firestore();
const auth = firebase.auth();

module.exports = { db, auth };

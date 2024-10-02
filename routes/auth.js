const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Example routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router; // Ensure you are exporting the router

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.get('/signup', authController.renderSignup); 
router.post('/signup', authController.signup);

router.get('/signin',authController.checkAuth , authController.renderSignin); 
router.post('/signin', authController.signin);

module.exports = router;

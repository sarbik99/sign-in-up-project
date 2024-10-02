const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
require('dotenv').config(); 

function renderSignup(req, res) {
    res.render('signup'); 
}

async function checkAuth(req, res, next) {
    const token = req.cookies.jwt; 
    if (!token) {
        return next(); 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return next(); 
        }
        res.render('index', { name: user.username }); 
    } catch (error) {
        console.log(error);
        return next(); 
    }
}

async function signup(req, res) {
    console.log('Request Body:', req.body);
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("jwt", token, {
            maxAge: 60000,
            httpOnly: true
        });
        await newUser.save();
        res.render('index', { name: username }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error signing up user', error });
    }
}

function renderSignin(req, res) {
    res.render('signin'); 
}

async function signin(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("jwt", token, {
            maxAge: 900000,
            httpOnly: true
        });
        res.render('index', { name: username });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
}

module.exports = { renderSignup, signup, renderSignin, signin, checkAuth };

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const connectDB = require('./config/db');
require('dotenv').config(); 
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const authController = require('./controllers/authController');

const templatesPath = path.join(__dirname, 'templates');
const publicPath = path.join(__dirname, 'public');

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', templatesPath);
app.use(express.static(publicPath));
app.use('/auth', authRoutes); 

app.get('/', authController.checkAuth, (req, res) => {
    res.render('index', { name: req.session.username }); 
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

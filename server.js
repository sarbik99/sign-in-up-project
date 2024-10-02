const express = require('express');
const path = require('path');

const templatesPath = path.join(__dirname, 'templates'); 
const publicPath = path.join(__dirname, 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up Handlebars
app.set('view engine', 'hbs');
app.set('views', templatesPath); 
app.use(express.static(publicPath)); 

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routes
app.get('/signin', (req, res) => {
    res.render('signin'); 
});
app.get('/signup', (req, res) => {
    res.render('signup'); 
});

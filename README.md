# SignIn-SignupProject
A mini project that implements a simple user authentication system using Node.js, Express, MongoDB, and Handlebars for the front-end templating. This project includes features like user sign-up, login, JWT-based session management, and secure password storage with bcrypt.

Features
User registration (sign-up) with hashed passwords
User login with JWT-based authentication
Session management using cookies
Protected routes using middleware
Handlebars templating for dynamic rendering of pages
MongoDB database for storing user credentials
Installation
Clone the repository:
Copy code
git clone https://github.com/sarbik99/sign-in-up-project.git
Navigate to the project directory.

bash
Copy code
cd repo-name
Install the required dependencies:

bash
Copy code
npm install
Set up the environment variables:

Create a .env file in the root of the project.
Add the following variables:
Copy code
JWT_SECRET=your-secret-key
MONGO_URI=your-mongo-uri
PORT=5000 (optional)

Technologies Used
Backend: Node.js, Express
Database: MongoDB
Templating Engine: Handlebars (hbs)
Authentication: JWT, bcrypt for password hashing
CSS: Basic styling
How It Works
Sign-up Process:

Users sign up with a username and password.
Password is hashed and stored securely in MongoDB.
A JWT token is generated and stored in cookies for session management.
Sign-in Process:

Users sign in with their credentials.
Password is compared with the stored hashed password using bcrypt.
On successful login, a JWT token is assigned, and the user is redirected to the homepage.
Session Management:

Cookies are used to store JWT tokens, ensuring the user stays logged in until the token expires.
Protected Routes:

Routes are protected by middleware that checks for a valid JWT token.

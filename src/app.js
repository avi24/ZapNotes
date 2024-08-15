//Import modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

// Create an Express app
const app = express();

// Define config variables
// TODO: Define in .env later on
const PORT = 9000;

// Middleware - Handle JSON requests 
app.use(express.json());
// Middleware - Serve static pages from 'static' directory
app.use(express.static(path.join(__dirname, '../static')));
// Middleware - CORS handling
app.use(cors());

// Route for homepage
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define an API route for notes
app.get('/api/notes', async (req, res) => {
    res.json({ message: 'Hello from the API!' });
});
// Define an API route for users
app.get('/api/users', async (req, res) => {
    const url = "https://randomuser.me/api/";
    const data = await axios.get(url);

    // console.log(data.data.results);
    res.json( data.data.results[0] );    
});

// Export the app
module.exports = app;

/*
const os = require('os');
const path = require('path');
const { add, subtract } = require('./modules/operations')



const fullPath = path.join(__dirname, 'public', 'images', 'logo.png');
console.log(fullPath); // Outputs: /home/user/project/public/images/logo.png

const platform = os.platform();
const arch = os.arch();
console.log(platform);
console.log(arch);

const sum = add(2,3)

console.log(`The addition of 2 and 3 is ${sum}`);
*/
//Import modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db.js');
const { Note, User } = require('./models/index.js')


// Define config variables
// TODO: Define in .env later on
const PORT = 9000;

// Create an Express app
const app = express();

// Connect to the database
connectDB();

// Note: During research I found that as of v4.16.0+ Express has implemented
// functionality of body-parser therefore I will use the express.json() and 
// express.urlencoded() methods to handle the respective request types
// Middleware - Handle JSON requests 
app.use(express.json());
// Middleware - Handle urlencoded requests 
app.use(express.urlencoded({ extended: true }));
// Middleware - Serve static pages from 'static' directory
app.use(express.static(path.join(__dirname, '../static')));
// Middleware - CORS handling
app.use(cors());

// Route for homepage
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

/*
// Create a mock API - CRUD
// Mock database
let notes = [
    {id: 1, title: 'Note 1', author: 'Author 1', message:"This is a sample note."},
    {id: 2, title: 'Note 2', author: 'Author 2', message:"Reminder to complete the project."},
];

// Route for GET /notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Route for GET /notes/:id (ie. route params)
app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(note => note.id === id);

    if (note) res.json(note);
    else res.status(404).json({message: `Note ${id} not found`});
});

// Route for POST /notes
app.post('/notes', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const message = req.body.message;

    // ID is a rep invariant, don't allow it to be set by client
    // Currently id is non-unique, implement it better
    const newNote = {id: notes.length + 1, title, author, message};

    notes.push(newNote);

    // Send a response with status 201 and the new note
    res.status(201).json(newNote);
});

// Route for PUT /notes/:id
app.put('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === id);

    if(noteIndex !== -1) {
        notes[noteIndex].title = req.body.title;
        notes[noteIndex].author = req.body.author;
        notes[noteIndex].message = req.body.message;
        res.json(notes[noteIndex]);
    } else {
        res.status(404).json({message: `Note ${id} not found`});
    }
});

// Route for DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === id);
    if(noteIndex != -1) {
        notes.splice(noteIndex, 1);
        res.json(`Note ${id} was successfully deleted`);
    } else {
        res.status(404).json({message: `Note ${id} not found`});
    }
});
*/

// Now use a real database
// Mock API - CRUD

// Route for GET /notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();

        if(notes.length > 0) res.json(notes);
        else res.status(200).send("No notes found.")
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }

    // Trying promise-chaining method also
    // Note.find()
    // .then(notes => {
    //     if(notes.length > 0) res.json(notes);
    //     else res.status(200).send("No notes found.")
    // })
    // .catch(err => {
    //     res.status(500).send(`Error: ${err.message}`);
    // });
});

// POST /notes
app.post('/notes', async (req, res) => {
    const note = new Note(req.body);
    try {
        await note.save();
        res.status(201).json(note); // status 201 for successful creation
    }
    catch(err) {
        res.status(500).send(`Error saving note: ${err.message}`);
    }
});

// API - read notes
app.get('/api/notes', async (req, res) => {
    try {
        const nid = req.query.nid;
        const age = req.query.age;
        res.send(`The note ID is: ${nid} and the age is: ${age}`);

        // const response = await axios.get(`http://localhost:${PORT}/api/notes`);

        // res.json({ message: 'Hello from the API!' });
    } catch {
        res.status(500).send({ message: 'Error fetching notes' });
    }
    
});
// Define an API route for users
app.get('/api/users', async (req, res) => {
    const url = "https://randomuser.me/api/";
    const response = await axios.get(url);

    // console.log(data.data.results);
    res.json( response.data.results[0] );    
});
// API - route for users/route params and query string
app.get('/api/users/:id/:productName', async (req, res) => {
    const nid = req.query.nid;
    const age = req.query.age;

    const userId = req.params.id;
    const productName = req.params.productName;

    res.send(`The note ID is: ${nid} and the age is: ${age} and the user ID is: ${userId}`);

    // const url = "https://randomuser.me/api/";
    // const response = await axios.get(url);

    // // console.log(data.data.results);
    // res.json( response.data.results[0] );    
});
// API - post request for /users
app.post('/api/users', async (req, res) => {
    // TODO: Implement post request
});
// API for authentication
app.post('/auth/signup', async (req, res) => {
    // TODO: Implement signup logic here
})
app.post('/auth/password/reset', async (req, res) => {
    // TODO: Implement password reset logic here
});
app.get('/auth/login', () => {
    // TODO: Implement login logic here
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
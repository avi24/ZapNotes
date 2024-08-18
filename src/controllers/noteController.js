// controllers/noteController.js

// Separation of concern: this file handles the app logic when dealing with the database.
// It is responsible for creating, reading, updating and deleting Notes from the database according to our schema

// Import our schema
const Note = require('../models/noteSchema.js');


// Fetch all notes
const getAllNotes = async (req, res) => {
    try {
        // TODO: add query string handling to add filters
        const notes = await Note.find();
        // .where(publishedAuthor).contains();

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
};

// Create a new note
const createNote = async (req, res) => {
    const note = new Note(req.body);
    
    try {
        await note.save();
        res.status(201).json(note); // status 201 for successful creation
    }
    catch(err) {
        res.status(500).send(`Error saving note: ${err.message}`);
    }
};

/*
// PUT /notes
// Deprecated: better to use PATCH for databases so it can update select fields and leave other values unchanged and be non-idempotent
app.put('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndUpdate(id, req.body, {new: true}); // this method can take a string because MongoDB converts it internally to an ObjectID type
        if(!note) res.status(404).json({message: `Note ${id} not found`});
        else res.json(note);
    } catch (err) {
        res.status(500).json({message: err.message}); // most common error would be if 'id' is not a 24-character hex value (ie. hex code representation of the ObjectID datatype)
    }
});
*/

// Update a note by ID
const updateNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndUpdate(id, req.body, {new: true});
        if(!note) res.status(404).json({message: `Note ${id} not found`});
        else res.json(note);
    } catch(err) {
        res.status(500).json({message: `Error updating note: ${err.message}`});
    }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        await Note.findByIdAndDelete(id); // this method can take a string because MongoDB converts it internally to an ObjectID type
        res.status(204).json({message: `Note ${id} deleted`}); // HTTP Status 204 to indicate successful deletion and no content to return
    } catch(err) {
        res.status(500).json({message: err.message}); // most common error would be if 'id' is not a 24-character hex value (ie. hex code representation of the ObjectID datatype)
    }
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}
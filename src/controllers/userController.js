// controllers/userController.js

// Separation of concern: this file handles the app logic when dealing with the database.
// It is responsible for creating, reading, updating and deleting Users from the database according to our schema

// Import mongoose for native error handling
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
// Import our schema
const User = require('../models/userSchema.js');

// User CRUD operations
// Get user by ID
const getAllUsers = async (req, res, next) => {
    try {
        // TODO: add query string handling to add filters
        const users = await User.find();

        // Data validation
        if(users.length === 0) throw new mongoose.Error.DocumentNotFoundError(`No users found.`);
        else res.json(users);
    }
    catch(err) {
        next(err);
    }
};

// Get user by ID
const getUserById = async (req, res, next) => {
    try {
        // TODO: add query string handling to add filters
        const id = req.params.userId;
        const user = await User.findById(id);

        // Data validation
        if(!user) throw new mongoose.Error.DocumentNotFoundError(`User ${id} not found`);
        else res.json(user);
    }
    catch(err) {
        next(err);
    }
};

// Create a new user
const createUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // hash the password before storing
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser); // status 201 for successful creation
    }
    catch(err) {
        // res.status(500).send(`Error creating user: ${err.message}`);
        next(err);
    }
};

// Update a user by ID
const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true}); // return the updated user by using {new:true}

        //
        if(!user) throw new mongoose.Error.DocumentNotFoundError(`User ${id} not found`);
        else res.json(user);
    } catch(err) {
        // res.status(500).json({message: `Error updating user: ${err.message}`});
        next(err);
    }
};

// Delete a user by ID
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.userId;
        await User.findByIdAndDelete(id); // this method can take a string because MongoDB converts it internally to an ObjectID type
        res.status(204).json({message: `User with ID ${id} deleted`}); // HTTP Status 204 to indicate successful deletion and no content to return
    } catch(err) {
        // res.status(500).json({message: err.message}); // most common error would be if 'id' is not a 24-character hex value (ie. hex code representation of the ObjectID datatype)
        next(err);
    }
};

// Sub-document Note CRUD operations
// Get all notes for user
const getNotes = async (req, res, next) => {
    const userId = req.params.userId;
    try { 
        const user = await User.findById(userId);
        res.json(user.notes);
    } catch (err) {
        next(err);
    }
}

// Create a note for user
const createNote = async (req, res, next) => {
    const userId = req.params.userId;
    const note = req.body;
    try {
        const user = await User.findById(userId);
        user.notes.push(note);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        // res.status(500).json({message: err.message});
        next(err);
    }
}

// Update a note for user
const updateNote = async (req, res, next) => {
    const userId = req.params.userId;
    const noteId = req.params.noteId;
    try {
        const user = await User.findById(userId);
        const note = user.notes.id(noteId); //.id() method available for sub-documents
        if(!note) throw new mongoose.Error.DocumentNotFoundError(`Note ${noteId} not found`);

        note.set(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        next(err);
    }
}

// Delete a note for user
const deleteNote = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const noteId = req.params.noteId;

        const user = await User.findById(userId);

        if (!user) {
            throw new mongoose.Error.DocumentNotFoundError('User not found');
        }

        // console.log(user.notes._id);
        await user.notes.id(noteId).deleteOne(); //.id() method available for sub-documents

        await user.save();
        res.json(user);
    } catch(err) {
        // res.status(500).json({message: err.message});
        next(err);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    getNotes,
    createNote,
    updateNote,
    deleteNote
}
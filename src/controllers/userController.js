// controllers/userController.js

// Separation of concern: this file handles the app logic when dealing with the database.
// It is responsible for creating, reading, updating and deleting Users from the database according to our schema

// Import our schema
const User = require('../models/userSchema.js');


// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        // TODO: add query string handling to add filters
        const users = await User.find();
        // .where(publishedAuthor).contains();

        if(users.length > 0) res.json(users);
        else res.status(200).send("No users found.")
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
};

// Create a new user
const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).json(newUser); // status 201 for successful creation
    }
    catch(err) {
        res.status(500).send(`Error creating user: ${err.message}`);
    }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true}); // return the updated user with {new:true}
        if(!user) res.status(404).json({message: `User with ID ${id} not found`});
        else res.json(user);
    } catch(err) {
        res.status(500).json({message: `Error updating user: ${err.message}`});
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id); // this method can take a string because MongoDB converts it internally to an ObjectID type
        res.status(204).json({message: `User with ID ${id} deleted`}); // HTTP Status 204 to indicate successful deletion and no content to return
    } catch(err) {
        res.status(500).json({message: err.message}); // most common error would be if 'id' is not a 24-character hex value (ie. hex code representation of the ObjectID datatype)
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUserById,
    deleteUserById
}
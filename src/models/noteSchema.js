const mongoose = require('mongoose');
const User = require('./userSchema.js');

//TODO: Add priority property
const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [1, 'Title must be at least 1 characters long'],
            // maxlength: [99, 'Title must be less than 100 characters long']
        },
        // // TODO: Use foreign key for User
        // author: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        author: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        // TODO: implement date modified correctly 
        dateModified: {
            type: Date,
            default: Date.now()
        },
        // just trying sample enum field in Mongo DB
        type: {
            type: String,
            enum: {
                values: ['public', 'private'],
                message: 'Type must be either public or private'
            }
        }
    }
);

// Create the model to be used
const Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;
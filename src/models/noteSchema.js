const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
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
            default: Date.now
        }
    }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
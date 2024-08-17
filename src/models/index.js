// The purpose of this index file is to centralize all the Schemas
// This makes it easier to export for the app to use

// include all Schemas
const Note = require('./noteSchema');
const User = require('./userSchema');

module.exports = { Note, User };
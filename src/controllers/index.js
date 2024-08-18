// The purpose of this index file is to consolidate all the controllers
// This makes it easier to export for the app to use

// include all controllers
const noteController = require('./noteController');
const userController = require('./userController');

module.exports = { noteController, userController };
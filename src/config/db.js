// As I try to use an MVC architecture for this project, I found  
// that certain files that handle the configuration of the app
// can be stored in a config/ directory in the src/
// ie. files such has the .env or the database connection
// they can be named according to the environment, too (ie. dev.js, prod.js)

const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/library";

// CONNECT TO MONGODB
const connectDB = () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(`Error connecting to database: ${err.message}`));
}

module.exports = connectDB;
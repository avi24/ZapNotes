// middleware/errorHandler.js
const mongoose = require('mongoose');

// This middleware is used to handle all the errors and exceptions 
// thrown by the app

const ERROR_MSGS = {
    "ECONNREFUSED": "Connection refused",
    "ECONNRESET": "Connection reset by peer",
    "ETIMEDOUT": "Connection timed out",
    "ECONNABORTED": "Connection aborted",
    "ENOTFOUND": "Unable to resolve the host",
}

const STATUS_CODE_MSGS = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
}

// The errorHandler function takes 4 paramters:
// 1. err: The error object
// 2. req: The request object
// 3. res: The response object
// 4. next: The next middleware function in the stack
const errorHandler = (err, req, res, next) => {
    // If the error is a validation error, return a 400 status code with the error message
    if (err instanceof mongoose.Error.ValidationError) {
         res.status(400).json({ message: err.message });

    } else {
        // If the error is a database error, return a 500 status code with the error message
        if (err instanceof mongoose.mongo.MongoError) {
            return res.status(500).json({ message: err.message });
        }
        // If the error is not a validation or database error, return a 500 status code with
        // the error message
        else {
            // Check if the error is a network error
            if (err instanceof mongoose.Error.DocumentNotFoundError) {
                return res.status(404).json({ message: err.message });
            }
            else {
                // if (err instanceof mongoose.Error.) {

                // } else {
                //     return res.status(500).json({ message: err.message });
                // }
                return res.status(500).json({ message: err.message });
            }
        }
    }
}
    
module.exports = errorHandler;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'] // got help for this regex command from ChatGPT
        },
        dob: {
            type: Date,
            // required: [true, 'Date of birth is required'],
            min: '1900-01-01',
            max: new Date() // no age requirement but must be maximum new born baby  
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            // min: [1, 'Username cannot be blank']
        },
        password: {
            type: String,
            // required: [true, 'Password is required'],
            min: [8, 'Password must be at least 8 characters'],
            max: [32, 'Password must not exceed 32 characters'],
            select: false // this is to prevent password from being displayed in the console
        },
        phoneNumber: {
            type: String
        },
        address: {
            type: String
        }
    }
);

// Create the User model
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
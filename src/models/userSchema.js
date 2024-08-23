const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [1, 'Title must be at least 1 characters long'],
            // maxlength: [99, 'Title must be less than 100 characters long']
        },
        message: {
            type: String,
            required: true
        },
        // just trying sample enum field in Mongo DB
        priority: {
            type: String,
            enum: {
                values: ['high', 'medium', 'low'],
                message: 'Type must be either public or private'
            }
        },        
    }, { timestamps: true } // let mongoose handle createdAt and updatedAt natively
);

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
            max: new Date() // max age is today's date 
        },
        password: {
            type: String,
            // required: [true, 'Password is required'],
            min: [8, 'Password must be at least 8 characters'],
            max: [32, 'Password must not exceed 32 characters'],
            select: false // this is to prevent password from being displayed in the results
        },
        phoneNumber: {
            type: Number,
            min: [10, 'Phone number must be at least 10 digits']
        },
        notes: [NoteSchema]
    }, { timestamps: true } // let mongoose handle createdAt and updatedAt natively
);

UserSchema.methods.verifyPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

// Create the User model
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
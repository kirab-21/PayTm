const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/paytmdb');

const userSchema = new Schema ({
    username: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        minLength: 6,
        maxLength: 20
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};
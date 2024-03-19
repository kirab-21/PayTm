const mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/paytmdb');

const userSchema = new Schema ({
    firstName: String,
    lastBame: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}
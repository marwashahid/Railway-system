const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String}
    ,
    email: {
        type: String,

    },
    // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;

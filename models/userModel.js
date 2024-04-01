const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true , required: false },
    password: { type: String, required: true},
    mobile: { type: String, required: true,  },
    cnic: { type: String, required: true, unique: true  },
    nearestStation: { type: String, required: true }
});

const User = mongoose.model('userModel', formDataSchema);

module.exports = User;
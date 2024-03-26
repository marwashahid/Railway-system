const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({
            name : req.name, 
            email : req.email

        });
        console.log(user)
        res.status(201).json({msg : "success"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Implement updateUser and deleteUser similarly

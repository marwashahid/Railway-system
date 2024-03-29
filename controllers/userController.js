const User = require('../models/userModel');

exports.validateuser = async (req, res) => {
    try {
        const { cnic, password } = req.body;

        // Find user in the database based on CNIC
        const user = await User.findOne({ cnic });

        // Check if user exists and if password matches
        if (user && user.password === password) {
            // Credentials are correct
            res.status(200).send('Sign in successful');
        } else {
            // Invalid credentials
            res.status(401).send('Invalid CNIC or password');
        }
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).send('Error signing in');
    }
};

exports.createUser = async (req, res) => {
    try {
        
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { cnic: req.body.cnic },
                { mobile: req.body.mobile }
            ]
        });

        // If user with the same email already exists, send an alert message in the response
        if (existingUser && existingUser.email === req.body.email) {
            return res.status(400).json({ alert: 'User already exists with this email' });
        }
        // If user with the same CNIC already exists, send an alert message in the response
        if (existingUser && existingUser.cnic === req.body.cnic) {
            return res.status(400).json({ alert: 'User already exists with this CNIC' });
        }
        // If user with the same mobile number already exists, send an alert message in the response
        if (existingUser && existingUser.mobile === req.body.mobile) {
            return res.status(400).json({ alert: 'User already exists with this mobile number' });
        }

        // If user does not exist, create a new user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            cnic: req.body.cnic,
            nearestStation: req.body.nearestStation,
        });
        console.log('User created:', user);

        // Send success response with the created user data
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        // Send error response
        res.status(500).json({ message: 'Failed to create user' });
    }
};



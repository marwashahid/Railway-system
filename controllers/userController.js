const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var tmp_email = "";
exports.validateuser = async (req, res) => {
    try {
        const { cnic, password, email} = req.body;

        // Find user in the database based on CNIC
        const user = await User.findOne({ cnic });

        // Check if user exists and if password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "5h",
                }
              );
        
              // save user token
              user.token = token;
            // Credentials are correct
            res.status(200);
            res.render('index');
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
             
                { cnic: req.body.cnic },
                { mobile: req.body.mobile }
            ]
        });

        // If user with the same email already exists, send an alert message in the response
        // if (existingUser && existingUser.email === req.body.email) {
        //     return res.status(400).json({ alert: 'User already exists with this email' });
        // }
        // If user with the same CNIC already exists, send an alert message in the response
        if (existingUser && existingUser.cnic === req.body.cnic) {
            return res.status(400).json({ alert: 'User already exists with this CNIC' });
        }
        // If user with the same mobile number already exists, send an alert message in the response
        // if (existingUser && existingUser.mobile === req.body.mobile) {
        //     return res.status(400).json({ alert: 'User already exists with this mobile number' });
        // }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(req.body.password, 10);

        // If user does not exist, create a new user
        const user = await User.create({
            name: req.body.name,
            email: (req.body.email).toLowerCase(),
            password: encryptedUserPassword,
            mobile: req.body.mobile,
            cnic: req.body.cnic,
            nearestStation: req.body.nearestStation,
        });
        console.log('User created:', user);
        email = (req.body.email).toLowerCase();

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "5h",
            }
          );
          // save user token
          user.token = token;
        // Send success response with the created user data
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        // Send error response
        res.status(500).json({ message: 'Failed to create user' });
    }
};

//Reset Password
exports.Resetpassword = async (req, res) => {
    try {
        const { new_password, confirm_password } = req.body;

        // Check if the new password and confirm password match
        if (new_password !== confirm_password) {
            return res.status(400).json({ alert: 'New password and confirm password do not match' });
        }

        const existingUser = await User.findOne({ email: tmp_email });

        // If user with the same email already exists, update the password
        if (existingUser) {
            if (existingUser.password === new_password) {
                return res.status(400).json({ alert: 'New password must be different from the old password' });
            }
            existingUser.password = new_password;
            await existingUser.save();
            return res.redirect('/signin');
            // return res.status(201).json({ alert: `Password updated for user with email: ${tmp_email}` });
        } else {
            console.log(`User with email ${tmp_email} not found.`);
            return res.status(400).json({ alert: `User with email ${tmp_email} not found.` });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        // Send error response
        res.status(500).json({ message: 'Failed to update password' });
    }
};



//email validate 
exports.validateemail = async (req, res) => {

    try {
        const { email } = req.body;

        tmp_email = email;

        // Find user in the database based on email
        const user = await User.findOne({ email });

        // Check if user exists and if password matches
        if (user && user.email === email) {
            // Credentials are correct

            const email = req.body.email; // Get the email from the form

            // Your existing sendOTP function
            const sendOTP = async () => {
                try {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'ismaildqniyal@gmail.com',
                            pass: 'ulhyuxavesvyueap'
                        }
                    });
                    const mailOptions = {
                        from: 'ismaildqniyal@gmail.com',
                        to: email,
                        subject: 'Update Password',
                        text: `Your Link for verification is: ${'http://localhost:3000/newpassword'}`
                    };
                    const info = await transporter.sendMail(mailOptions);
                    console.log('Link email sent:', info.response);
                    // alert("Link Send Successfully");
                    //  return res.redirect('/index');
                } catch (error) {
                    console.error('Error sending Link:', error);
                }
            };
            await sendOTP();
            res.send('Email sent successfully.');
            // document.getElementById('mailVerificationForm').style.display = 'block';
            //document.getElementById('response').innerHTML = 'Email sent successfully.';
        } else {
            // Invalid credentials
            // alert('Invalid Email');
            res.status(401).send('Invalid Email');
        }
    } catch (error) {
        console.error('Error signing in:', error);
        //alert('Error Email Sending');
        res.status(500).send('Error signing in');
    }

};

let generatedOTP = ''; // Variable to store the generated OTP


// Function to generate OTP
const generateOTP = () => {
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

exports.sendOTP = async (req, res) => {

    const email = req.body.email; // Get the email from the form

    // Your existing sendOTP function
    const sendOTP = async () => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ismaildqniyal@gmail.com',
                    pass: 'ulhyuxavesvyueap'
                }
            });
            const mailOptions = {
                from: 'ismaildqniyal@gmail.com',
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${generatedOTP}`
            };
            const info = await transporter.sendMail(mailOptions);
            console.log('OTP email sent:', info.response);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };
    generateOTP();
    await sendOTP();
    res.send('Email sent successfully.');
    // document.getElementById('mailVerificationForm').style.display = 'block';
    //document.getElementById('response').innerHTML = 'Email sent successfully.';

};

exports.verifyOTP = async (req, res) => {
    const enteredOT = req.body.otp; // Get the entered OTP from the form
    // Get the generated OTP from the previous request

    if (enteredOT === generatedOTP) {
        res.json({ success: true, message: ' Account created!' });
        //res.redirect('/SignIn');
    } else {
        res.json({ success: false, message: 'OTP does not match.' });
    }
}
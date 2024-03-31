const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Set views directory and template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/railway')
.then(()=> console.log('mongodb connected'))
.catch((err) => console.log("Mongo Error",err));

// Use userRoutes for handling user-related requests
app.use('/routes', userRoutes);
app.use('/', userRoutes);
app.use('/SignIn',userRoutes);
app.use('/Check',userRoutes);

app.get('/otp-form', (req, res) => {
    res.render('SignIN');
});
let generatedOTP = ''; // Variable to store the generated OTP

// Function to generate OTP
const generateOTP = () => {
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};
// Route to handle form submission and send OTP
app.post('/send-otp', async (req, res) => {
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
});


app.post('/verify-otp', (req, res) => {
    const enteredOT = req.body.otp; // Get the entered OTP from the form
     // Get the generated OTP from the previous request

    if (enteredOT === generatedOTP) {
        res.json({ success: true, message: ' Account created!' });
        //res.redirect('/SignIn');
    } else {
        res.json({ success: false, message: 'OTP does not match.' });
    }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

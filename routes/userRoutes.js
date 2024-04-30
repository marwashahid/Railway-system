const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path')

router.post('/SignIn', userController.createUser);
router.post('/Check', userController.validateuser);
router.post('/send-link', userController.validateemail);
router.post('/ResetPassword', userController.Resetpassword);
router.post('/send-otp',userController.sendOTP);
router.post('/verify-otp',userController.verifyOTP);

router.get('/', (req, res) => {
    // Construct the relative path to the index.html file
    const indexPath = path.join(__dirname,  '../', 'index.html');
    
    // Send the index.html file as the response
    res.sendFile(indexPath);
});

router.get('/SignIn', (req, res) => {
    
    res.render("SignIn");
});

// Route to render Send email link for update password.ejs
router.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword');
});

// Route to render newpassword.ejs
router.get('/newpassword', (req, res) => {
    res.render('newpassword');
});

router.get('/otp-form', (req, res) => {
    res.render('SignIn');
 });

module.exports = router;

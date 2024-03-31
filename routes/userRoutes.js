const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path')

router.post('/SignIn', userController.createUser);
router.post('/Check', userController.validateuser);
router.get('/', (req, res) => {
    // Construct the relative path to the index.html file
    const indexPath = path.join(__dirname,  '../', 'index.html');
    
    // Send the index.html file as the response
    res.sendFile(indexPath);
});

router.get('/SignIn', (req, res) => {
    // Construct the relative path to the index.html fi
    
    // Send the index.html file as the response
    res.render("SignIn");
});
module.exports = router;

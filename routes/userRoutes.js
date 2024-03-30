const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/controllers', userController.createUser);

//router.post('/controllers', userController.createUser);
// Define PUT and DELETE routes as well

module.exports = router;

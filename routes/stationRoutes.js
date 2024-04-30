const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

router.get('/search', stationController.getStations);
//router.post('/controllers', userController.createUser);
// Define PUT and DELETE routes as well

module.exports = router;

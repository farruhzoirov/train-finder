const express = require('express');

const router = express.Router();


appController = require('../controllers/app.controller');


router.get('/', appController.getMainPage );

router.get('/get-all-data', appController.getAllData);

router.post('/find-data', appController.findData);

// router.post('/find-realtime-data', appController.findRealtimeData);


module.exports = router;
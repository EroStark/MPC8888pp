var express = require('express');
var router = express.Router();
var db = require('../db/queries');

router.get('/getAllInstruments' , db.getAllInstruments)
router.post('/addInstrument', db.addInstrument);

module.exports = router;


// import packages
const bcrypt = require('bcryptjs');
const express = require('express');
const json2xml = require('json2xml');
const jwt = require('jsonwebtoken');
const mongojs = require('mongojs');

// import files
const config = require('../config.json');

// declare vars
const db = mongojs(config.dburi);
const router = express.Router();


/* routes */

// GET all apartments
router.get('/', function(req, res, next) {

	const format = req.query.format;
	const start = parseInt(req.query.start);
	const count = parseInt(req.query.count);
	db.Apartments.find({}).sort({ date: -1 }).limit(count).skip(start, function(err, apartments) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(apartments))
		else
			res.json(apartments)
	});
});




module.exports = router;

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

// GET  bookings of id
router.post('/', function(req, res, next) {
    const format = req.query.format;
    const id = mongojs.ObjectID(req.body.id)

	db.Bookings.find({ renterId : id }, function(err, bookings) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(ads))
		else
			res.json(bookings)
	});
});

module.exports = router;

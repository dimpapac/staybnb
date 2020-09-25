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
			res.send(json2xml(bookings))
		else
			res.json(bookings)
	});
});


router.post('/requests', function(req, res, next) {
    const format = req.query.format;
    const id = mongojs.ObjectID(req.body.id)

	db.BookingRequests.find({ hostId : id }, function(err, requests) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(requests))
		else
			res.json(requests)
	});
});

router.post('/remove', function(req, res, next) {
    const format = req.query.format;
    const id = mongojs.ObjectID(req.body.id)

	db.BookingRequests.remove({ _id : id }, function(err, requests) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml({text:"removed"}))
		else
			res.json({text:"removed"})
	});
});

router.post('/accept', function(req, res, next) {
    const format = req.query.format;
	const id = mongojs.ObjectID(req.body.id)
	const hostId = mongojs.ObjectID(req.body.hostId)
	const renterId = mongojs.ObjectID(req.body.renterId)
	const adId = mongojs.ObjectID(req.body.adId)

	db.Bookings.insert({ 
		_id : id ,
		hostId : hostId,
		renterId: renterId,
		adId: adId,
		bookedFrom: req.body.bookedFrom,
		bookedTill: req.body.bookedTill,
		hostName: req.body.hostName,
		username: req.body.username
	}
	, function(err, requests) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml({text:"accepted"}))
		else
			res.json({text:"accepted"})
	});
});

module.exports = router;

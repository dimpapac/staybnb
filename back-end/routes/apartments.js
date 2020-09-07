
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
	db.Apartments.find({}).limit(count).skip(start, function(err, apartments) {
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

// GET all available apartments in dates given
router.get('/available', function(req, res, next) {
	const format = req.query.format;
	const start = parseInt(req.query.start);
	const count = parseInt(req.query.count);
	const startDate = parseInt(req.query.startDate);
	const endDate = parseInt(req.query.endDate);
	db.Bookings
	.find({ 
		$or : [ {$and : [ { 'bookedFrom' : { $lte : new Date(startDate) }  } , { 'bookedFrom' : { $lte : new Date(endDate) }  } ] } ,
		 {$and : [ { 'bookedTill' : { $gte : new Date(startDate) }  } , { 'bookedFrom' : { $gte : new Date(endDate) }  } ] } ] 
		})
	// .find(  {$and : [ { 'bookedFrom' : { $gte : new Date(startDate) }  } , { 'bookedFrom' : { $gte : new Date(startDate) }  } ] }  )
	.limit(count).skip(start, function(err, bookings) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		else {
			let result = bookings.map(a => mongojs.ObjectID(a.apartmentId) )
			console.log(result)
			db.Apartments.find( { _id : { $in: result } } , function(err , apartments ){
				if (err) {
					if (format && format === "xml")
						res.send(json2xml(err))
					else
						res.send(err);
					return;
				}
				else{
					if (format && format === "xml")
						res.send(json2xml(apartments))
					else
						res.json(apartments)
				}
			})
		}
	});
});



module.exports = router;

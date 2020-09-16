
// import packages
const bcrypt = require('bcryptjs');
const express = require('express');
const json2xml = require('json2xml');
const jwt = require('jsonwebtoken');
const mongojs = require('mongojs');
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'uploads/');
	},
	filename: function(req,file,cb){
		cb(null,file.originalname)
	}
});

const fileFilter = (req,file,cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
		cb(null,true);
	else
		cb(new Error("file has to be png or jpeg"),false);
};

const upload = multer({
	storage : storage ,
	limits : {
		fileSize : 1024 * 1024 * 5
	},
	fileFilter : fileFilter
})

// import files
const config = require('../config.json');

// declare vars
const db = mongojs(config.dburi);
const router = express.Router();


/* routes */

// GET all ads
router.get('/', function(req, res, next) {

	const format = req.query.format;
	const start = parseInt(req.query.start);
	const count = parseInt(req.query.count);
	db.Ads.find({}).limit(count).skip(start, function(err, ads) {
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
			res.json(ads)
	});
});

// GET all available ads in dates given
router.get('/available', function(req, res, next) {
	const format = req.query.format;
	const start = parseInt(req.query.start);
	const count = parseInt(req.query.count);
	const startDate = parseInt(req.query.startDate);
	const endDate = parseInt(req.query.endDate);
	db.Bookings
	.find({ 
		$or : [ {$and : [ { 'bookedFrom' : { $gt : new Date(startDate) }  } , { 'bookedFrom' : { $lt : new Date(endDate) }  } ] } ,
		{$and : [ { 'bookedTill' : { $gt : new Date(startDate) }  } , { 'bookedTill' : { $lt : new Date(endDate) }  } ] } ,
		{$and : [ { 'bookedTill' : { $gte : new Date(endDate) }  } , { 'bookedFrom' : { $lte : new Date(startDate) }  } ] }] 
		}, function(err, invalidBookings) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		else {
			let result = invalidBookings.map(a => mongojs.ObjectID(a._id) )
			db.Ads.find( { _id : { $nin: result } }).limit(count).skip(start , function(err , ads ){
				if (err) {
					if (format && format === "xml")
						res.send(json2xml(err))
					else
						res.send(err);
					return;
				}
				else{
					if (format && format === "xml")
						res.send(json2xml(ads))
					else
						res.json(ads)
				}
			})
		}
	});
});

router.post("/newAd",upload.array('productImage'),function(req,res,next){
	const format = req.query.format;

	console.log(req.files)

	const photos = []
	req.files.map((file) => {
		photos.push(file.originalname)
	})


	db.Ads.insert(
		{ 
			title: req.body.title ,
			price : req.body.price, 
			photos: photos,
			location: {
				adress: req.body.adress ,
				longitude: parseFloat(req.body.longitude),
				latitude: parseFloat(req.body.latitude)
			},
			description: req.body.description
		}
		 ,function(err,mess) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		else{
			if (format && format === "xml")
				res.send(json2xml({ text : "ad registered"}))
			else
				res.send({ text : "ad registered"});
			return;
		}
	})
})

// GET all ads
router.get('/uploads', function(req, res, next) {

	const format = req.query.format;
	const fileName = req.query.fileName;

	res.sendFile( fileName, { root: './uploads' });

});

// GET all available ads in dates given
router.get('/:id', function(req, res, next) {

	const format = req.query.format;
	let id = mongojs.ObjectID(req.params.id)

	db.Ads.find({ _id : mongojs.ObjectID(req.params.id) }, function(err, ad) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		else {
			if (format && format === "xml")
				res.send(json2xml(ad[0]))
			else
				res.json(ad[0])
		}
	});

});


module.exports = router;

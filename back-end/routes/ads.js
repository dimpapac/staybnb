
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


const upload = multer({
	storage : storage
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
	const visitors = parseInt(req.query.visitors);
	const location = req.query.location;
	const start = parseInt(req.query.start);
	const count = parseInt(req.query.count);
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;

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
			let result = invalidBookings.map(a => mongojs.ObjectID(a.adId) )
			console.log(result)
			db.Ads.find( { $and : [{ _id : { $nin: result } } , {'location.area' : location } ,{ capacity : { $gte : visitors }} ] } ).sort( { price : 1 } ).limit(count).skip(start , function(err , ads ){
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

	const photos = []
	req.files.map((file) => {
		photos.push(file.originalname)
	})
	
	let hostId = mongojs.ObjectID(req.body.hostId) 
	
	db.Ads.insert(
		{ 
			title: req.body.title ,
			price : req.body.price, 
			type : req.body.type,
			capacity : parseInt(req.body.capacity),
			photos: photos,
			location: {
				area: req.body.area,
				address: req.body.address ,
				longitude: parseFloat(req.body.longitude),
				latitude: parseFloat(req.body.latitude),
			},
			description: req.body.description,
			locationInfo: req.body.locationInfo,
			totalReviews : 0,
			filters : {
				airco : req.body.airco,
				wifi : req.body.wifi,
				heat :req.body.heat,
				tv : req.body.tv,
				elevator : req.body.elevator,
				kitchen : req.body.kitchen, 
				parking : req.body.parking,
			},
			hostId : hostId,
			hostName : req.body.hostName
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

router.post("/addBooking",function(req, res, next){
	const format = req.query.format
	db.BookingRequests.insert(
		{ 
			hostId: mongojs.ObjectID(req.body.hostId),
			renterId: mongojs.ObjectID(req.body.renterId),
			adId: mongojs.ObjectID(req.body.adId),
			bookedFrom: new Date(req.body.bookedFrom),
			bookedTill: new Date(req.body.bookedTill),
			hostName : req.body.hostName,
			username :req.body.username
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
				res.send(json2xml({ text : "booking added"}))
			else
				res.send({ text : "booking added"});
			return;
		}
	})
	
});

router.post("/addReview",function(req, res, next){
	const format = req.query.format
	db.Reviews.insert(
		{ 
			userId: mongojs.ObjectID(req.body.hostId),
			username: mongojs.ObjectID(req.body.renterId),
			adId: mongojs.ObjectID(req.body.adId),
			text: req.body.text,
			stars: req.body.stars
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
				res.send(json2xml({ text : "review added"}))
			else
				res.send({ text : "review added"});Z
			return;
		}
	})
	
});

router.post("/updateReview",function(req, res, next){
	const format = req.query.format
	let id = mongojs.ObjectID(req.body.adId)
	db.Ads.update(
		{ 
			_id : id
		},{
			$inc: { totalReviews: 1 },
			$push: { reviews : { text : req.body.text , stars : req.body.stars , username : req.body.username } }
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
				res.send(json2xml({ text : "review added"}))
			else
				res.send({ text : "review added"});
			return;
		}
	})
	
});


router.post("/updateUser",function(req, res, next){
	console.log("asd")
	const format = req.query.format
	let id = mongojs.ObjectID(req.body.userId)
	db.Users.updateOne(
		{ 
			_id : id
		},{
			$set: {
				name : {
					firstName : req.body.fName,
					lastName  : req.body.lName
				},
				email : req.body.email
			}
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
				res.send(json2xml({ text : "review added"}))
			else
				res.send({ text : "review added"});
			return;
		}
	})
	
});

// GET all available ads in dates given
router.post('/hostAds', function(req, res, next) {

	const format = req.query.format;
	let id = mongojs.ObjectID(req.body.id)

	db.Ads.find({ hostId : id }, function(err, ads) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		else {
			if (format && format === "xml")
				res.send(json2xml(ads))
			else
				res.json(ads)
		}
	});
});


// GET all ads
router.post('/users', function(req, res, next) {
	const format = req.query.format;
	if(req.body.type > 0){
		return null
	}

	db.Users.find({},function(err, users) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(users))
		else
			res.json(users)
	});
});

router.post('/users/delete', function(req, res, next) {
    const format = req.query.format;
    const id = mongojs.ObjectID(req.body.id)

	db.Users.remove({ _id : id }, function(err, requests) {
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

router.post('/users/approve', function(req, res, next) {
    const format = req.query.format;
    const id = mongojs.ObjectID(req.body.id)

	db.Users.updateOne({ _id : id },{$set: { approved :  1 }},function(err, requests) {
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



module.exports = router;

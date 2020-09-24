// import packages
// const bcrypt = require('bcryptjs');
const express = require('express');
const json2xml = require('json2xml');
const mongojs = require('mongojs');

// import files
const config = require('../config.json');

// declare vars
const db = mongojs(config.dburi);
const router = express.Router();

//Send message
router.post('/sendmessage', function(req, res, next) {
	console.log('api: send message');

	const format = req.query.format;
	const today = new Date();
	db.Messages.save({
		sender_id : req.body.sender,
		receiver_id: req.body.receiver,
		message : req.body.message,
		read: false,
		time : today
	}, function(err, message) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(message))
		else
			res.json(message)
	})
});


//Find message by id, change read status
router.post('/message', function(req, res, next) {
	console.log('api: message by Id ' + req.body.message_id);

	const format = req.query.format;
	db.Messages.findOne({ _id: mongojs.ObjectID(req.body.message_id)}, function(err, message) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if ((req.body.open_id == message.receiver_id) && (message.read == false)) {
			db.Messages.findAndModify({ 
				query: { _id: mongojs.ObjectID(req.body.message_id) },
				update: { $set: { read: true } }
			}, function(err, message) {
				if (err) {
					if (format && format === "xml")
						res.send(json2xml(err))
					else
						res.send(err);
					return;
				}
			});
		}
		if (format && format === "xml")
			res.send(json2xml(message))
		else
			res.json(message)
		return;
	});
});

//Find inbox by receiver's id
router.get('/inbox/:id', function(req, res, next) {
	console.log('api: inbox by user');

	const format = req.query.format;
	db.Messages.find({ receiver_id: { $in: [req.params.id] } }, function(err, messages) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(messages))
		else
			res.json(messages)
	});
});

//Find sent by sender's id
router.get('/sent/:id', function(req, res, next) {
	console.log('api: sent by user');

	const format = req.query.format;
	db.Messages.find({ sender_id: { $in: [req.params.id] } }, function(err, messages) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(messages))
		else
			res.json(messages)
	});
});

//get notifications
router.get('/notifications/:id', function(req, res, next) {
	console.log('api: notifications by user');

	const format = req.query.format;
	db.Messages.find({ receiver_id: { $in: [req.params.id] }, read: false }, function(err, messages) {
		if (err) {
			if (format && format === "xml")
				res.send(json2xml(err))
			else
				res.send(err);
			return;
		}
		if (format && format === "xml")
			res.send(json2xml(messages.length))
		else
			res.json(messages.length)
	});
});


module.exports = router;

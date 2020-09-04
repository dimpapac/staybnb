// import packages
const bcrypt = require('bcryptjs');
const express = require('express');
const json2xml = require('json2xml');
const mongojs = require('mongojs');

// import files
const config = require('../config.json');

// declare vars
const db = mongojs(config.dburi);
const router = express.Router();


// aux functions
async function getById(id) {

	await db.Users.findOne({ _id: id }, function(err, user) {
		if (user)
			return user;
		return null;
	});
}

// module.exports = router;
module.exports = {
	router : router,
	getById: getById
}
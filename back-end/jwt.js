const expressJwt = require('express-jwt');
const config = require('./config.json');
const services = require('./routes/users');

module.exports = jwt;

function jwt() {
	const secret = config.secret;
	return expressJwt({ secret, isRevoked , algorithms: ['HS256'] }).unless({
		path: [
			/^\/staybnb\/api\/.*/
		]
	});

}

async function isRevoked(req, payload, done) {
	//console.log(payload+ ' '+ payload.sub+ ' ');
	var pl =  req.headers.authorization.split(' ')[1].split('.')[1];
	//var dec = jwtDecode.jwt_decode(pl, config.secret);
	//console.log(pl);
	const user = await services.getById(payload.sub);

	// revoke token if user no longer exists
	if (!pl) {
		return done(null, true);
	}

	done();
};
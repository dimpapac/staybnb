//import packages
const https = require("https");
const express = require('express')
const fs = require("fs");
const bodyParser = require('body-parser');
const jwt = require('./jwt');


// import files
const base = require('./routes/base');
const ads = require('./routes/ads');
const messages = require('./routes/messages');
const bookings = require('./routes/bookings');




// declare vars
const options = {
	key: fs.readFileSync("./server.key"),
	cert: fs.readFileSync("./server.crt")
};

const app = express();
const port = 9000

app.use(jwt());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
	next();
});

//Body Parsers middle ware
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));


app.use('/staybnb/api/', base);
app.use('/staybnb/api/ads', ads);
app.use('/staybnb/api/messages', messages);
app.use('/staybnb/api/bookings', bookings);
app.use('uploads/',express.static('uploads'));


server = https.createServer(options, app).listen(port, function(){
	console.log(`Server started on port ${port}`);
});

module.exports = server;
const mongojs = require('mongojs')

const db = mongojs('mongodb+srv://admin:okokokok@cluster0.0kw64.mongodb.net/airbnb?retryWrites=true&w=majority')

db.runCommand({ping: 1}, function (err, health) {
	console.log(health)
})

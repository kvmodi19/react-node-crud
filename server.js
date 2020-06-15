const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const userRoutes = require('./api/book');

// enable cors
app.use(cors('*'));

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app, db);

db.sequelize.sync().then(() => {
	app.listen(5000, function () {
		console.log('listening on 5000');
	});
});
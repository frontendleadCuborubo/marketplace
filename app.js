const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const app = express();
app.disable('x-powered-by'); // Not working
app.use(helmet());

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected.'))
	.catch((error) => console.log(error));

app.use(cookieParser(keys.jwt.secret));
// app.use(
// 	session({
// 		secret: keys.jwt.secret,
// 		name: 'sessionId',
// 		resave: true,
// 		saveUninitialized: true, //false
// 	})
// );
app.use(passport.initialize());
// app.use(passport.session());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
// app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist/client'));

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
		);
	});
}

module.exports = app;
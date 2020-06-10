const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const keys = require('../config/keys');

const options = {
	jwtFromRequest: (req) => req.signedCookies.token,
	secretOrKey: keys.jwt.secret,
	passReqToCallback: true,
};

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(options, async (req, payload, done) => {
			try {
				const user = await User.findById(payload.userId).select(
					'email firstname lastname phone addressRegion gender about'
				);

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (e) {
				console.log(e);
			}
		})
	);
};

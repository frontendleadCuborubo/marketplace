module.exports = {
	mongoURI: 'mongodb access',
	port: 'port',
	jwt: {
		secret: 'secret',
		options: {
			expiresIn: '12h',
		},
		cookie: {
			httpOnly: 'httpOnly',
			sameSite: 'sameSite',
			signed: 'signed',
			secure: 'secure',
		},
	},
};

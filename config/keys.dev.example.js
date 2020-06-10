module.exports = {
	mongoURI: 'mongodb access',
	port: 'port',
	jwt: {
		secret: 'secret',
		options: {
			audience: 'https://example.io',
			expiresIn: '12h',
			issuer: 'example.io',
		},
		cookie: {
			httpOnly: 'httpOnly',
			sameSite: 'sameSite',
			signed: 'signed',
			secure: 'secure',
		},
	},
};

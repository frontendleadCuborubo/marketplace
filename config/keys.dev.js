module.exports = {
	mongoURI:
		'mongodb://admin:admin123@ds135956.mlab.com:35956/ng-marketplace-db',
	port: 3030,
	jwt: {
		secret:
			process.env.JWT_SECRET ||
			'xjc3L8qBi-s1Krn31Zqo3xNlSQl8NghkivbaCzlIhSA8vAApB1RRdy4GmOO7ChQClbKAtXH0TPJTEwyv2pRJPw-ZwzNIPl7F9QOg6IxjMB0JBWz5Dd5v4nJNsc7RD-k58FSkiJA5o6IdTACvE-b8rHTPW-wjiuSUzKW9I9Uu0xxPj-kXWrfHv265PPI-NQodYl1CC5VDclTt-dIYScf_axnx73e6mcxfVHiukeLaKAJfLP-9QfiXiBFZSsG9dd0G0jjxBRpmPGVSHM_o5O4heTqxg89W9s-IG1tm09fNy6UeOxdUt3nQDfQfYe2BhXei1fJGy8G1wgzYTHjikmSMeQ',
		options: {
			// audience: 'http://localhost:4200',
			expiresIn: '12h', //Date.now() + 60, // * 60, // * 1000 * 4, //'12h' 1d
			// issuer: 'localhost:4200',
		},
		cookie: {
			httpOnly: true,
			sameSite: false,
			signed: true,
			secure: false,
		},
	},
};

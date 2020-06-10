const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async function (req, res) {
	const candidate = await User.findOne({ email: req.body.email });

	if (candidate) {
		const passwordResult = bcrypt.compareSync(
			req.body.password,
			candidate.password
		);

		if (passwordResult) {
			const token = jwt.sign(
				{
					userId: candidate._id,
				},
				keys.jwt.secret,
				{ expiresIn: keys.jwt.options.expiresIn }
			);

			res.status(200)
				.cookie('token', token, {
					secure: false,
					maxAge: Date.now() + 12 * 60 * 60 * 1000,
					httpOnly: true,
					signed: true,
				})
				.json({
					success: true,
					data: {},
				});
		} else {
			res.status(401).json({
				success: false,
				data: {},
				errors: ['Пароли не совпадают. Попробуйте снова.'],
			});
		}
	} else {
		res.status(404).json({
			success: false,
			data: {},
			errors: ['Пользователь с таким email не найден.'],
		});
	}
};

module.exports.logout = async function (req, res) {
	if (req.signedCookies.token) {
		res.clearCookie('token');
	}

	res.status(200).json({
		success: true,
		data: {},
	});
};

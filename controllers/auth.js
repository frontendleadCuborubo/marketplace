const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

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

module.exports.signup = async function (req, res) {
	// email password
	const candidate = await User.findOne({ email: req.body.email });

	if (candidate) {
		// Пользователь существует, нужно отправить ошибку
		res.status(409).json({
			message: 'Такой email уже занят. Попробуйте другой.',
		});
	} else {
		// Нужно создать пользователя
		const salt = bcrypt.genSaltSync(10);
		const password = req.body.password;
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
		});

		try {
			await user.save();
			res.status(201).json(user);
		} catch (e) {
			errorHandler(res, e);
		}
	}
};

const errorHandler = require('../utils/errorHandler');

module.exports.getUser = async function (req, res) {
	try {
		res.json({
			success: true,
			data: req.user,
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.updateUser = async function (req, res, next) {
	try {
		let user = req.user;
		user.set(req.body);
		let result = await user.save();

		res.json({
			success: true,
			data: result,
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports = (res, error) => {
	res.status(500).json({
		success: false,
		data: {},
		errors: [error.message ? error.message : error],
	});
};

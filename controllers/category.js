const Category = require('../models/Category');
const slug = require('slug');
const errorHandler = require('../utils/errorHandler');

/**
 * Get All Root categories
 */
module.exports.getRootCategories = async function (req, res) {
	try {
		const categories = await Category.find({})
			.where('parent_id')
			.equals(0)
			.select('id image_id level name parent_id path');
		res.status(200).json({
			success: true,
			data: categories,
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.getChildren = async function (req, res) {
	try {
		const categories = await Category.find({})
			.where('parent_id')
			.equals(req.params.id)
			.select('id image_id level name parent_id path');
		res.status(200).json({
			success: true,
			data: categories,
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.getByPath = async function (req, res) {
	try {
		const category = await Category.findOne({
			path: req.params.path,
		}).select('id image_id level name parent_id path');

		res.status(200).json({
			success: true,
			data: category,
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.create = async function (req, res) {
	const category = new Category();
	category.set(req.body);
	try {
		await category.save();
		res.status(201).json(category);
	} catch (e) {
		errorHandler(res, e);
	}
};

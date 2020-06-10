const Category = require('../models/Category');
const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getById = async function (req, res) {
	try {
		const product = await Product.findById(req.params.id)
			.populate('categories', 'name path image_id id')
			.populate('user', 'email firstname lastname phone addressRegion')
			.select('title description price currency createdAt images');
		res.status(200).json(product);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.getProductCollection = async function (req, res) {
	const PAGE_SIZE = 12;
	const page = req.query.page || 1;
	const sort = req.query.sort || '-updatedAt';

	try {
		const totalProducts = await Product.count({});
		const productCollection = await Product.find({})
			.where('categories')
			.equals(req.params.id)
			.sort(sort)
			.skip(PAGE_SIZE * (page - 1))
			.limit(PAGE_SIZE)
			.populate('user', 'addressRegion')
			.select('title description price currency images');

		let response = {
			success: true,
			data: [],
		};
		if (productCollection.length) {
			response = {
				...response,
				data: productCollection,
				totalProducts: totalProducts,
				pages: Math.ceil(totalProducts / PAGE_SIZE),
			};
		}

		res.status(200).json(response);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.create = async function (req, res) {
	try {
		const categories = await Category.find()
			.where('id')
			.in(req.body.category_ids)
			.select('_id')
			.exec();

		const product = new Product({
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			categories: categories,
			user: req.user.id,
		});
		await product.save();
		res.status(201).json(product);
	} catch (e) {
		errorHandler(res, e);
	}
};

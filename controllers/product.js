const Category = require('../models/Category');
const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
	//   try {
	//     const categories = await Category.find({user: req.user.id})
	//     res.status(200).json(categories)
	//   } catch (e) {
	//     errorHandler(res, e)
	//   }
};

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

module.exports.remove = async function (req, res) {
	//   try {
	//     await Category.remove({_id: req.params.id})
	//     await Position.remove({category: req.params.id})
	//     res.status(200).json({
	//       message: 'Категория удалена.'
	//     })
	//   } catch (e) {
	//     errorHandler(res, e)
	//   }
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

module.exports.update = async function (req, res) {
	//   const updated = {
	//     name: req.body.name
	//   }
	//   if (req.file) {
	//     updated.imageSrc = req.file.path
	//   }
	//   try {
	//     const category = await Category.findOneAndUpdate(
	//       {_id: req.params.id},
	//       {$set: updated},
	//       {new: true}
	//     )
	//     res.status(200).json(category)
	//   } catch (e) {
	//     errorHandler(res, e)
	//   }
};

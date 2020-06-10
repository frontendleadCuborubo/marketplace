const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
			index: true,
		},
		price: {
			type: Number,
			required: true,
		},
		special_price: {
			type: String,
		},
		images: [
			{
				type: String,
				default: '',
			},
		], // Required
		status: {
			type: Number,
			enum: [1, 2, 3, 4],
			default: 2,
		},
		currency: { type: Number, enum: [1, 2, 3], default: 1 },
		categories: [
			{
				type: Number,
				required: true,
				ref: 'categories',
				type: Schema.Types.ObjectId,
			},
		],
		user: {
			ref: 'users',
			type: Schema.Types.ObjectId,
		},
	},
	{ timestamps: true, autoIndex: process.env.NODE_ENV == 'development' }
);

module.exports = mongoose.model('products', productSchema);

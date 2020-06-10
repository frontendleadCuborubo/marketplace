const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		parent_id: {
			type: Number,
			default: 0,
		},
		path: {
			type: String,
			default: '',
		},
		level: {
			type: Number,
			default: 0,
		},
		image_id: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true, autoIndex: process.env.NODE_ENV == 'development' }
);

categorySchema.plugin(AutoIncrement, { inc_field: 'id' });
categorySchema.plugin(uniqueValidator);

categorySchema.pre('save', function (next) {
	let category = this;

	if (category.isModified('name')) {
		category.path = slug(category.name);
	}

	next();
});

module.exports = mongoose.model('categories', categorySchema);

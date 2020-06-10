const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			lowercase: true,
			validate: (value) => validator.isEmail(value),
		},
		phone: {
			type: String,
			index: true,
		},
		password: {
			type: String,
			required: [true, 'Password required'],
		},
		firstname: {
			type: String,
		},
		lastname: {
			type: String,
		},
		image_id: {
			type: String,
			default: '',
		},
		addressRegion: String,
		gender: { type: String, enum: ['M', 'F'] },
		about: String,
	},
	{ timestamps: true, autoIndex: process.env.NODE_ENV == 'development' }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('users', userSchema);

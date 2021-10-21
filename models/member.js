const mongoose = require('mongoose');
const { v4 } = require('uuid');

const linkSchema = new mongoose.Schema({
	link: {
		type: String,
		required: true
	},
	linktext: {
		type: String,
		required: true
	},
	subtext: {
		type: String,
		default: 'SUBTEXT'
	},
	star: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

const memberSchema = new mongoose.Schema({
	name: String,
	email: String,
	googleId: String, 
	username: {
		type: String,
		default: v4().substring(0, 7),
		unique: true
	},
	location: {
		type: String,
		default: ''
	},
	photo: {
		type: String,
		default: ''
	},
	links: [linkSchema]
}, {
	timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);
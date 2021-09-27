const mongoose = require('mongoose');

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

const subSchema = new mongoose.Schema({
	subEmail: {
		type: String,
		required: true
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
		default: 'username'
	},
	location: {
		type: String,
		default: 'location'
	},
	photo: {
		type: String,
		default: ''
	},
	links: [linkSchema],
	subscriptions: [subSchema]
}, {
	timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);
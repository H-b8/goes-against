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

const subSchema = new mongoose.Schema({
	subEmail: {
		type: String,
		required: true
	},
	subscribedTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
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
	links: [linkSchema],
	subscriptions: [subSchema]
}, {
	timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);
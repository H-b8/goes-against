const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Subscriber', subscriberSchema);
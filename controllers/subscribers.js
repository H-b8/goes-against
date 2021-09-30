const Member = require('../models/member');
const Subscriber = require('../models/subscriber');

module.exports = {
    addSub,
    viewSubs,
    deleteSub
};

async function addSub(req, res) {
	const member = await Member.findById(req.params.memberID);
	req.body.subscribedTo = member;
	const subscription = await Subscriber.create(req.body);
	res.status(201).json(subscription);
};

async function viewSubs(req, res) {
    const subs = await Subscriber.find({subscribedTo: req.params.memberID});
    res.status(200).json(subs)
};

async function deleteSub(req, res) {
    const deletedSub = await Subscription.findByIdAndRemove(req.params.subID);
    res.status(200).json(deletedSub);
};
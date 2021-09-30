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
}

async function viewSubs(req, res) {
    const subs = await Subscriber.find({subscribedTo: req.params.memberID});
    res.status(200).json(subs)
}

function deleteSub(req, res, next) {
	Member.findById(req.params.mid, function (err, member) {
		let x = member.subscriptions.id(req.params.sid)
		x.remove();
		member.save(function (err) {
			res.redirect(`/member/${req.params.mid}/subscribers`);
		});
	});
}
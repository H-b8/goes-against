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
    const subs = await Subscriber.find({ subscribedTo: req.params.memberID });

    Member.findById(req.params.memberID, function (err, member) {
        res.render('member/subs', {
            member,
            subs,
            user: req.user
        })
    });

    // res.status(200).json(subs);
};

async function deleteSub(req, res) {
    console.log(req.params.subID)
    const sub = await Subscriber.findById(req.params.subID);
    console.log(sub)
    // 
    // const deletedSub = await Subscription.findByIdAndRemove(req.params.subID);
    const member = Member.findById(sub.subscribedTo, function (err, member) {
        res.render('member/subs', {
            member,
            user: req.user
        })
    });

    console.log(member)
    // res.status(200).json(deletedSub);
};
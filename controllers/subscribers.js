const Member = require('../models/member');
const Subscriber = require('../models/subscriber');

module.exports = {
    addSub,
    viewSubs,
    deleteSub
};

async function addSub(req, res) {
    console.log(req.user)
    const member = await Member.findById(req.params.memberID);
    req.body.subscribedTo = member;
    const newSub = await Subscriber.create(req.body);
    
    res.render('member/profile', {
        member,
        newSub,
        user: req.user
    });

    // res.status(201).json(newSub);
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
    const deletedSub = await Subscription.findByIdAndRemove(req.params.subID);
    const member = Member.findById(sub.subscribedTo, function (err, member) {
        res.render('member/subs', {
            member,
            deletedSub,
            user: req.user
        })
    });

    console.log(member)
    // res.status(200).json(deletedSub);
};
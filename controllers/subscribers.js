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
    req.body.subscribedTo = req.params.memberID;
    const newSub = await Subscriber.create(req.body);

    res.render('member/profile', {
        member,
        newSub,
        user: req.user
    });

    // res.status(201).json(newSub);
};

// VIEW ALL SUBS
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
    const subToDelete = await Subscriber.findById(req.params.subID);
    const member = await Member.findById(subToDelete.subscribedTo);
    const deletedSub = await Subscriber.findByIdAndRemove({ _id: req.params.subID }, { useFindAndModify: false });
    const subs = await Subscriber.find({ subscribedTo: member._id });

    res.render('member/subs', {
        member,
        subs,
        deletedSub,
        user: req.user
    });

    // res.status(200).json(subs);
};
const Member = require('../models/member');

module.exports = {
  profile,
  addLink,
  addSub,
  viewSubs,
  edit
};

function profile(req, res, next) {
  Member.findById(req.params.id, function(err, member) {
    if (err) return next(err);
    res.render('member/profile', {
      member,
      // name: req.query.name,
      user: req.user
    });
  });
}

function addLink(req, res, next) {
  req.user.links.push(req.body);
  req.user.save(function(err) {
    res.redirect(`/member/${req.user._id}`);
  });
}

function addSub(req, res, next) {
  Member.findById(req.params.id, function(err, member) {
    member.subscriptions.push(req.body);
    member.save(function (err) {
      res.redirect(`/member/${member._id}`);
    })
  })
}

function viewSubs(req, res) {
  Member.findById(req.params.memberId, function(err, member) {
    res.render('member/subs', {
      member,
      user: req.user
    })
  });
}

function edit(req, res) {
  console.log('im working')
  console.log(req.params.id)
  Member.findByIdAndUpdate(req.params.id, req.body, function(err) {
    res.redirect(`/member/${req.params.id}`);
  })
}
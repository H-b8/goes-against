const Member = require('../models/member');

module.exports = {
  index,
  addLink,
  delLink
};

function index(req, res, next) {
  Member.find({}, function(err, member) {
    if (err) return next(err);
    res.render('member/index', {
      member,
      name: req.query.name,
      user: req.user
    });
  });
}

function addLink(req, res, next) {
  req.user.links.push(req.body);
  req.user.save(function(err) {
    res.redirect('/member');
  });
}

function delLink(req, res, next) {

}
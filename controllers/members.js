const Member = require('../models/member');

module.exports = {
  index,
  addLink,
  delLink
};

function index(req, res, next) {
  Member.find({}, function(err, members) {
    if (err) return next(err);
    res.render('members/index', {
      members,
      name: req.query.name,
      user: req.user
    });
  });
}

function addLink(req, res, next) {
  req.user.links.push(req.body);
  req.user.save(function(err) {
    res.redirect('/members');
  });
}

function delLink(req, res, next) {

}
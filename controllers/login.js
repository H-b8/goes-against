const Member = require('../models/member');

module.exports = {
  index
};

function index(req, res, next) {
  Member.find({}, function(err, member) {
    if (err) return next(err);
    res.render('member/login', {
      user: req.user
    });
  });
}
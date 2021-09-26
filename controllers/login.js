const Member = require('../models/member');

module.exports = {
  index
};

function index(req, res, next) {
  console.log('hitting', req.user)
  Member.find({}, function(err, member) {
    if (err) return next(err);
    res.render('member/login', {
      user: req.user
    });
  });
}
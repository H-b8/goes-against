var router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.redirect('/members');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/members',
    failureRedirect: '/members'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/members');
});

module.exports = router;

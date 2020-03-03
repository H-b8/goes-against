var router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.redirect('/login');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/member', // should go to member profile
    failureRedirect: '/login'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

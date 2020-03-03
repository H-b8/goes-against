var router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  // res.render('login');
  res.redirect('/member');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/member',
    failureRedirect: '/member'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/member');
});

module.exports = router;

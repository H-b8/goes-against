var router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.redirect('/login');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', function(req, res, next) {
  passport.authenticate(
    'google',
    function(err, user) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect(`member/${user._id}`);
      })
    })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

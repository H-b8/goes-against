const router = require('express').Router();
const subsCtrl = require('../controllers/subscribers');

// HITS API_URL/SUBS/...

// ANY SITE VISITOR MAY SUBSCRIBE
router.post('/:memberID', subsCtrl.addSub);

// ONLY LOGGED IN USER MAY VIEW AND DELETE FROM THEIR SUBSCRIBERS LIST
router.get('/:memberID', isLoggedIn, subsCtrl.viewSubs);
router.delete('/:subID', isLoggedIn, subsCtrl.deleteSub);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
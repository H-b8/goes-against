const router = require('express').Router();
const memberCtrl = require('../controllers/member');

router.get('/', memberCtrl.index);

router.post('/links', isLoggedIn, memberCtrl.addLink);

// DELETE /links/:id
router.delete('/links/:id', memberCtrl.delLink);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
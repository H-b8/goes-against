var router = require('express').Router();
var memberCtrl = require('../controllers/member');

// GET /students
router.get('/', memberCtrl.index);

router.post('/links', isLoggedIn, memberCtrl.addLink);

// DELETE /links/:id
router.delete('/links/:id', memberCtrl.delLink);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
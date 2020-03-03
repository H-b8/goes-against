var router = require('express').Router();
var membersCtrl = require('../controllers/members');

// GET /students
router.get('/', membersCtrl.index);

router.post('/links', isLoggedIn, membersCtrl.addLink);

// DELETE /links/:id
router.delete('/links/:id', membersCtrl.delLink);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
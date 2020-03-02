var router = require('express').Router();
var membersCtrl = require('../controllers/members');

// GET /students
router.get('/', membersCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/facts', isLoggedIn, membersCtrl.addFact);

// DELETE /facts/:id
router.delete('/facts/:id', membersCtrl.delFact);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
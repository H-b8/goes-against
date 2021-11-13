const router = require('express').Router();
const memberCtrl = require('../controllers/member');

// MEMBER PROFILE READ + UPDATE
router.get('/:memberId', memberCtrl.readMember); 
router.post('/:memberId/update', isLoggedIn, memberCtrl.updateMember); // POST REQ BC EJS IS WEIRD

// PROFILE LINKS CRUD
router.post('/links', isLoggedIn, memberCtrl.createLink);
router.post('/:mid/links/:lid/update', isLoggedIn, memberCtrl.updateLink);
router.delete('/:mid/links/:lid', isLoggedIn, memberCtrl.deleteLink);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
};

module.exports = router;
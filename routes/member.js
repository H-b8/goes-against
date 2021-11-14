const router = require('express').Router();
const memberCtrl = require('../controllers/member');

// MEMBER PROFILE READ + UPDATE
router.get('/:memberId', memberCtrl.readMember); 
router.post('/:memberId/update', isLoggedIn, memberCtrl.updateMember); // POST REQ BC EJS IS WEIRD
// router.put('/:memberId', isLoggedIn, memberCtrl.updateMember);

// PROFILE LINKS CRUD
router.post('/:memberId/links', isLoggedIn, memberCtrl.createLink);
router.get('/:memberId/links/:linkId', isLoggedIn, memberCtrl.readLink);
router.post('/:memberId/links/:linkId/update', isLoggedIn, memberCtrl.updateLink); // POST REQ BC EJS IS WEIRD
// router.put('/:memberId/links/:linkId', isLoggedIn, memberCtrl.updateLink);
router.delete('/:memberId/links/:linkId', isLoggedIn, memberCtrl.deleteLink);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
};

module.exports = router;
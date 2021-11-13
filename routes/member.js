const router = require('express').Router();
const memberCtrl = require('../controllers/member');

// MEMBER PROFILE READ + UPDATE
router.get('/:memberId', memberCtrl.readOne);
// router.post('/:id/update', isLoggedIn, memberCtrl.update);
router.put('/:memberId', memberCtrl.update);

// PROFILE LINKS CRUD
router.post('/links', isLoggedIn, memberCtrl.addLink);
router.get('/:mid/links/:lid', isLoggedIn, memberCtrl.showLink);
router.post('/:mid/links/:lid/update', isLoggedIn, memberCtrl.editLink);
router.delete('/:mid/links/:lid', isLoggedIn, memberCtrl.delLink);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
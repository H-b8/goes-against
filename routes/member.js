const router = require('express').Router();
const memberCtrl = require('../controllers/member');

router.get('/:id', memberCtrl.profile);
router.post('/:id/update', isLoggedIn, memberCtrl.editMember);

router.post('/links', isLoggedIn, memberCtrl.addLink);
router.get('/:mid/links/:lid', isLoggedIn, memberCtrl.showLink);
router.post('/:mid/links/:lid/update', isLoggedIn, memberCtrl.editLink);
router.delete('/:mid/links/:lid', isLoggedIn, memberCtrl.delLink);

// router.post('/:id/addsub', memberCtrl.addSub);
// router.get('/:id/subscribers', isLoggedIn, memberCtrl.viewSubs);
// router.delete('/:mid/subscribers/:sid', isLoggedIn, memberCtrl.deleteSub);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
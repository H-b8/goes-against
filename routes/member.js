const router = require('express').Router();
const memberCtrl = require('../controllers/member');

router.get('/:id', memberCtrl.profile);

router.post('/links', isLoggedIn, memberCtrl.addLink);
// router.delete('/links/:id', isLoggedIn, memberCtrl.delLink);

router.post('/:id/update', memberCtrl.edit);
router.post('/:id/subscriptions', memberCtrl.addSub);
router.get('/:memberId/viewsubs', memberCtrl.viewSubs);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
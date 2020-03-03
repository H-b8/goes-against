const router = require('express').Router();
const loginCtrl = require('../controllers/login');

router.get('/', loginCtrl.index);

module.exports = router;

const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const userpageRoutes = require('./userpage-routes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/userpage', userpageRoutes);


module.exports = router;
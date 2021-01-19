const router = require('express').Router();
const bookRoutes = require('./books-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/comments', commentRoutes);


module.exports = router;
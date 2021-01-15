
const sequelize = require('../config/connection');
const {Book, User, Comment, Vote} = require('../models');
const router = require('express').Router();


// Testroute
router.get('/login', (req, res) => {
    res.render('login');
  });


module.exports = router;




const sequelize = require('../config/connection');
const {Book, User, Comment, Vote} = require('../models');
const router = require('express').Router();


// Homepage page
router.get('/', (req, res) => {
  res.render('homepage');
});


// login page
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;



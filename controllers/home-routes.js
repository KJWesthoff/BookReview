const jwt = require('jsonwebtoken');
const sequelize = require('../config/connection');
const { Book, User, Comment, Vote } = require('../models');
const router = require('express').Router();


// Homepage page get all books in db
router.get('/', (req, res) => {
  //console.log('======================');
  Book.findAll({
    attributes: [
      'id',
      'title',
      'author',
      'created_at',
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'book_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },

      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {

      const books = dbPostData.map(book => book.get({ plain: true }));
      console.log(books)
      res.render('homepage', {
        books,
        accessToken: req.cookies.accessToken

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login page
router.get('/login', (req, res) => {
  if (req.accessToken) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports = router;



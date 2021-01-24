
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
      'book_url',
      'img_url',
      [sequelize.literal('(SELECT COUNT(stars) FROM vote WHERE book.id = vote.book_id)'), 'vote_count'],
        [sequelize.literal('(SELECT AVG(stars) FROM vote WHERE book.id= vote.book_id)'), 'vote_avg']
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
      },
      {
        model: Vote,
        attributes:[
          'user_id',
          'stars',
        
        ],
        include:[
          {
            
           model:User,
            
            attributes:['id','username'],
            
           
          }
        ]

      }

     

    ]
  })
    .then(dbPostData => {

      const books = dbPostData.map(book => book.get({ plain: true }));
      //console.log(books.map(book => book.votes))

      //console.log("Logged IN: ==========  ", req.session.loggedIn)
      res.render('homepage', {
        books,
        loggedIn: req.session.loggedIn,
        user:req.session.username
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/book/:id', (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'author',
      'created_at',
      'book_url',
      'img_url'
    ],
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
      model: Vote,
      attributes: ['user_id', 'stars']
    }
  ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      
      const book = dbPostData.get({ plain: true });
      //console.log(book)

      res.render('single-book', {
        book,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login',{loggedIn: req.session.loggedIn});
});



  module.exports = router;



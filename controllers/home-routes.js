
const sequelize = require('../config/connection');
const {Book, User, Comment, Vote} = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session);
  
    Book.findAll({
      attributes: [
        'title',
        'author',
        'created_at',
      
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
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBookData => {
       
        const books = dbBookData.map(post => post.get({plain:true}));
        console.log(books)
        res.json(books);
        /*
        res.render('startpage', {
          posts,
          loggedIn: req.session.loggedIn,
          userName: req.session.username,

        });
        */
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


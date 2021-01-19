const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, User, Comment, Vote } = require('../models');
const tokenAuth = require("../utils/auth");

// Get all the users books

router.get('/',tokenAuth, (req, res) => {
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
            attributes: ['username'],
            // Username from req here
            where: {
              username:req.username   
            },
          }
        ],
 
      })
      .then(dbPostData => {
      
        const books = dbPostData.map(book => book.get({plain:true}));
        console.log(books)
        
        res.render('userpage', {
          books:books,
          user:req.username
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
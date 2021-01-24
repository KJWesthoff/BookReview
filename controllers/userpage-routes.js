const router = require('express').Router();

const sequelize = require('../config/connection');
const { Book, User, Comment, Vote } = require('../models');
const tokenAuth = require("../utils/auth");

// Get all the users books by Vote
  // Make a combined query of Votes and comments for a given user
  router.get('/',tokenAuth, (req, res) => {
    
    console.log(req.session.loggedIn)
    
    Book.findAll({
     
        attributes: [
          'id',
          'title',
          'author',
          'created_at',
          'book_url',
          'img_url',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
              model: Vote,
              attributes:['user_id','stars'],
              required:true,
              include:[
                {
                  required:true,
                  model:User,
                  attributes:['id','username'],
                  where:{id:req.session.user_id},
                 
                }
              ]

            },

        ],
           
      })    
        
        
      .then(dbPostData => {
        
        const books = dbPostData.map(book => book.get({plain:true}));
        console.log(books)
        
        //res.json(dbPostData)


        res.render('userpage', {
          books:books,
          user:req.session.username,
          loggedIn:req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
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
          [sequelize.literal('(SELECT COUNT(stars) FROM vote WHERE book.id = vote.book_id)'), 'vote_count'],
          [sequelize.literal('(SELECT AVG(stars) FROM vote WHERE book.id= vote.book_id)'), 'vote_avg']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
              model: Vote,
              attributes:['user_id','stars'],
              required:true,
              include:[
                {
                  
                 model:User,
                  
                  attributes:[
                    'id',
                    'username',
                    
                
                ],
                  where:{id:req.session.user_id},
                  
                 
                }
              ]

            },
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'book_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
          },

        ],
           
      })    
        
        
      .then(dbPostData => {
        
        const books = dbPostData.map(book => book.get({plain:true}));
        
     

        for(book of books){
          console.log(book.votes[0].stars)
          book.stars = book.votes[0].stars
        }  

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
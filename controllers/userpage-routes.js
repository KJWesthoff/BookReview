const router = require('express').Router();

const sequelize = require('../config/connection');
const { Book, User, Comment, Vote } = require('../models');
const tokenAuth = require("../utils/auth");

// Get all the users books
  // Make a combined query of Votes and comments for a given user
  router.get('/',tokenAuth, (req, res) => {
    
    console.log(req.session.loggedIn)
    
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
            model:User,
            attributes:['id', 'username'],
            include: [
 
              {
                model: Vote,
                attributes:['user_id'],
                //where:{user_id:req.user_id},
                
              },
              {
                model: Comment,
                attributes: ['comment_text', 'user_id'],
                //where:{user_id:req.user_id},
              }, 
             
            ],
            //where:{id:req.user_id}
            
          },
        ]
          
      })    
        
        
      .then(dbPostData => {
        
        const books = dbPostData.map(book => book.get({plain:true}));
        console.log(books)
        
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
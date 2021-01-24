const router = require('express').Router();
const { Comment, Vote, Book } = require('../../models');
const tokenAuth = require("../../utils/auth");


router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/', tokenAuth, (req, res) => {
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      book_id: req.body.book_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  
  router.delete('/:id', tokenAuth,(req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/vote', tokenAuth, (req, res) => {
    voteObj = {
      stars: req.body.stars,
      user_id: req.session.user_id,
      book_id: req.body.book_id
    }
    console.log("VOTEOBJ ======================", voteObj);

    Vote.create(voteObj)
      .then(dbVoteData => res.json(dbVoteData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });




  // Test the votes..
  router.get('/votes', (req,res) =>{
    Vote.findAll()
    .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


    // Test the votes by book no
    router.get('/votes/:id', (req,res) =>{
      
      Vote.findAll({
      attributes:['book_id', 'stars'],  
      include:[
        {
          model:Book,
          attributes:['id'],
          required:true,
          where:{id:req.params.id},
        }

      ]

      })
      .then(dbCommentData => {
      
        const votes = dbCommentData.map(vote => vote.get({plain:true}))
        
        let sum = 0;
        let nVotes = 0;
        for(vote of votes){
          sum += vote.stars
          nVotes ++
        }

        let avg = sum/nVotes;
        
        console.log(nVotes + " Votes, avg " + avg);

        res.json({"votes":nVotes, "avg":avg})
      
      })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  

  module.exports = router;
  

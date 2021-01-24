const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Book, User, Vote, Comment } = require('../../models');

const tokenAuth = require("../../utils/auth");

// get all Books with authorization
router.get('/auth', tokenAuth,  (req, res) => {
  //console.log('======================');
  Book.findAll({
    attributes: [
      'id',
      'title',
      'author',
      'img_url',
      'book_url',
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
        model: Vote,
        attributes: ['user_id', 'stars']
      }
    ]
  })
    .then(dbPostData => {

      //res.json(dbPostData)
      //console.log("authorization", "Bearer " + localStorage.getItem('savedAccesToken'))
      //res.header( "authorization", "Bearer " + localStorage.getItem('savedAccesToken'));
      //res.redirect("/homepage", {books:(dbPostData)})
      res.json(dbPostData)
    
    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// get all Books
router.get('/', (req, res) => {
  //console.log('======================');
  Book.findAll({
    attributes: [
      'id',
      'title',
      'author',
      'img_url',
      'book_url',
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
        model: Vote,
        attributes: ['user_id', 'stars']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Get book by id

router.get('/:id', (req, res) => {
    Book.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
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
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


// Find a book by title:

router.post('/title', (req, res) => {
  // expects {title:  , author: , user_id: }
  Book.findAll({
      where: {
      title: req.body.title      
    }
  })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
  });


//Find the votes of a book
// Get book by id


// Create a Book in the database

router.post('/',tokenAuth, (req, res) => {
// expects {title:  , author: , user_id: }
Book.create({
    title: req.body.title,
    author: req.body.author,
    user_id: req.body.user_id, // Implement user here
    book_url: req.body.book_url, 
    img_url: req.body.img_url, 
    
})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.put('/:id', tokenAuth, (req, res) => {
Book.update(
    {
    title: req.body.title,
    author:req.body.author
    },
    {
    where: {
        id: req.params.id
    }
    }
)
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

/*
router.put('/add_user:id', (req, res) => {
  Book.update(
      {
        user_id: req.body.user_id
      },
      {
      where: {
          id: req.params.id
      }
      }
  )
      .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(dbPostData);
      })
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
  });
*/

router.delete('/:id', tokenAuth, (req, res) => {
Book.destroy({
    where: {
    id: req.params.id
    }
})
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});


module.exports = router;
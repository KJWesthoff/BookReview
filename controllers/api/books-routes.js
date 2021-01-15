const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Book, User, Vote, Comment } = require('../../models');

// get all Books
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


// Create a Book in the database

router.post('/', (req, res) => {
// expects {title:  , author: , user_id: }
Book.create({
    title: req.body.title,
    author: req.body.author,
    user_id: req.body.user_id, // Implement user here
    

})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});



router.put('/:id', (req, res) => {
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

router.delete('/:id',  (req, res) => {
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
const router = require('express').Router();
const { User, Book, Vote, Comment } = require('../../models');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const tokenAuth = require("../../utils/auth");


// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a User by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'author', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Book,
          attributes: ['title', 'author']
        }
      },
      {
        model: Book,
        attributes: ['title','author'],
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Create a new user
router.post('/', (req, res) => {
  // expects {username: <str>, email:<str> , password:<str> }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {


        // Dig out the data we want from the dbUserData returned from the DB
        const userdata = {
        user_id: dbUserData.id,
        username: dbUserData.username,
        user_email: dbUserData.email
        } 



        // Generate a jsonwebtoken with userdata as payload
        const accessToken = jwt.sign(userdata, process.env.ACCESS_TOKEN_SECRET)
        
        res.json({message: 'You are now added as user!', accessToken:accessToken });

        /*  // cookie version
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        
            res.json(dbUserData);
        });
        */
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// post route log in an existing user 
router.post('/login', (req, res) => {
// expects {email: 'str@str.str', password: 'str'}

 

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    
    // check the password with the function in models/User
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Dig out the data we want from the dbUserData returned from the DB
    const userdata = {
        user_id: dbUserData.id,
        username: dbUserData.username,
        user_email: dbUserData.email
    } 

    // Generate a jsonwebtoken with userdata as payload
    const accessToken = jwt.sign(userdata, process.env.ACCESS_TOKEN_SECRET)
    

    // cookie version
    //req.session.save(()=>{
    //  req.session.user_id = dbUserData.id;
    //  req.session.username = dbUserData.username;
    //  req.session.loggedIn = true;
    //res.redirect('/');
    //});

    // Return the webtoken to client
    
    res.json({message: 'You are now logged in!', accessToken:accessToken });
      
    
 
  });
});




// Update user infomation on the server    
router.put('/:id', tokenAuth, (req, res) => {
  // expects {username: <str>, email: <str>, password: <str>}
  
  // cehck if user login email is the same as the token
  if(req.user_email != req.body.user_email){
    res.status(406).json({ message: 'You can only change your own account'});
    return;
  }  
  
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});






// Delete a user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*
router.post('/logout', (req,res)=>{
  if(req.session.loggedIn) {
    req.session.destroy(()=>{
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
})
*/

module.exports = router;
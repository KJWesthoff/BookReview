const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));

// ========================
// Auth test part

books = [
{
    title: "Hitchikers Guide to The Galaxy",
    author: "Douglas Adams"
},
{
    title: "C++",
    author: "Bjarne Stoustrup"
}];



// Simpletest route with autentifaton check
app.get('/books', authenticateToken, (req, res) => {
    
    console.log(req.user.name)
    
    res.json(books);
});


app.get('/login', (req, res) => {
    res.render('login');
  });


app.post('/login', (req, res) => {
    const username = req.body.username;
    // make a payload object (here its just username)
    const user = {name: username};
    // encrypt the whole thing with the super secret password
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    
    // return the access token to client (where it can be picked up and stored)
    res.json({accessToken: accessToken})

});


  
// middleware functon to authorize token
function authenticateToken(req,res,next){
    // look in the autorization part of the httprequest header
    const authHeader = req.headers['authorization']
    // dig out the token
    const token = authHeader && authHeader.split(' ')[1]
    // check if there is a token
    if(token == null){
        return res.sendStatus(401)
    }
    
    // verify the token and dig out the payload (just user i this case)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if(err){
         return res.sendStatus(403)
        }
        // set user on the req obj = user from token and pass on with next
        req.user = user
        next()
    })    

} 

// =================================

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });







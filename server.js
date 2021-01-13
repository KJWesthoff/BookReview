const express = require('express');
const exphbs = require('express-handlebars');

 
const sequelize = require('./config/connection');

const jwt = require('jsonwebtoken');

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());

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



// Simpletest route
app.get('/books', authenticateToken, (req, res) => {
    
    console.log(req.user.name)
    
    res.json(books);
});


app.post('/login', (req, res) => {
    const username = req.body.username;
 
    const user = {name: username};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
});

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if(err){
         return res.sendStatus(403)
        }
        req.user = user
        next()
    })    

} 

// =================================

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });







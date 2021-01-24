const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path'); // for stitching together paths
const sequelize = require('./config/connection');
const controllers = require('./controllers');
//const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')  


// server configuration
const app = express();
const PORT = process.env.PORT || 3001;




app.use(cookieSession({
  name:'session',
  keys:[process.env.ACCESS_TOKEN_SECRET]
})
);

app.use(cookieParser());


//importing Helpers function for formatting help. 
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

// Set the handlebars engine (npm express-handlebars)
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// enable use of a static folder for client side js
app.use(express.static(path.join(__dirname, '/public')));

app.use(controllers);
// launch SQL server and app server

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });







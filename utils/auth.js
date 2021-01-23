const jwt = require('jsonwebtoken');


function tokenAuth (req,res,next){
    
  

    // for a accessToken cookie else look in the autorization part of the httprequest header  
    
    if(token = req.cookies['accessToken']){
        const token = req.cookies['accessToken'];
    } else {
        // dig token out of cookie
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
    }
    
    // check if there is a token
    if(token == null){
        
        res.redirect("/login");
    }

    // verify the token and dig out the payload (just user in this case)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=> {
        if(err){
            res.redirect("/login");
        }
        
        // set user on the req obj = user from token and pass on with next
        req.username = payload.username;
        req.user_id = payload.user_id;
        req.user_email = payload.user_email;
        
        next()
    })    

} 
  
module.exports = tokenAuth;

  
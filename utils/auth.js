const jwt = require('jsonwebtoken');


function tokenAuth (req,res,next){
    // look in the autorization part of the httprequest header


    const authHeader = req.headers['authorization']
    // dig out the token
    const token = authHeader && authHeader.split(' ')[1]

    // check if there is a token
    if(token == null){
        return res.sendStatus(401)
    }

    // verify the token and dig out the payload (just user in this case)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=> {
        if(err){
            return res.sendStatus(403)
        }
        
        // set user on the req obj = user from token and pass on with next
        req.username = payload.username;
        next()
    })    

} 
  
module.exports = tokenAuth;

  
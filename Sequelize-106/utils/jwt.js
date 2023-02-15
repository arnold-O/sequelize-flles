const jwt = require("jsonwebtoken");
 const dotenv = require('dotenv')
 dotenv.config();
 
 function jwtToken(payload){
   
   const token =  jwt.sign({id:payload.id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_SECRET_EXPIRES_IN
    })

    return token

 } 

    module.exports = jwtToken
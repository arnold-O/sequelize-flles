
const jwt = require("jsonwebtoken");
const { secret } = require("./jwt.config");

const verifyToken =  (req, res, next) => {
    try {
      let userToken = req.headers["authorization"];
  
      if (userToken) {
        const userData = jwt.verify(userToken, secret);
  
        if(!userData){
          return res.status(500),json({
            msg:"token invalid"
          })
        }
      
         req.user = userData,
         console.log(req.user)
        next()
      }
      else{
       return res.status(500).json({
          msg:"token not present"
        })
  
      }
    } catch (error) {
      res.status(404).json({
        msg: "invalid user or something joor",
        error,
      });
    }
  };


  module.exports = verifyToken
const express = require("express");
const { Op } = require("sequelize");
const User = require("../models/").User;
const Email = require("../models/").Email;
const AppError = require("../utils/appError");
const { authorize } = require("../utils/authCheck");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const jwtToken = require("../utils/jwt");
const { protect } = require("../utils/jwtValidate");

const router = express.Router();

router.post("/user", async(req, res) => {
    const {name, phone_number}  = req.body

    if(!name, !phone_number){
        next(new AppError('Please provide Credentials', 404))
    }
   
    const newUser = await User.create({
        name,
        phone_number
       
    })
 return res.status(200).json({
    status: "sucess",
    data:newUser
  });
});

router.post(
    "/user/login",
    catchAsyncErrors(async (req, res, next) => {
      const {phone_number } = req.body;
      const user = await User.findOne({
        where: {
            phone_number: {
            [Op.eq]: phone_number,
          },
        },
      });
  
      if (user) {
        //create a token
       
        const token = jwtToken(user);
        
          return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: user,
            token,
          });
       
      } else {
        return next(new AppError("Invalid credential , try again", 400));
      }
    })
  );

router.get("/user", async(req, res) => {

    const allUser = await User.findAll({
      include:{
        model: Email 
      }
    })

    if(allUser.length < 1 ){
        return res.status(200).json({
            status: "sucess",
            message:"No user SAVED yet !!!"
          });

    }else{
        return res.status(200).json({
            status: "sucess",
            data:allUser
          });
    }

 
});
router.get("/plansb-offers", protect, authorize('planB'), async(req, res) => {
  
        return res.status(200).json({
            status: "sucess",
            message:"!!!"
          });


 
});

module.exports = router;
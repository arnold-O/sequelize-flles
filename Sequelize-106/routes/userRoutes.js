const express = require("express");
const User = require("../models/").User;
const AppError = require("../utils/appError");

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

module.exports = router;
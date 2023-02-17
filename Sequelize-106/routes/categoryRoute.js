const express = require("express");
const AppError = require("../utils/appError");
const { authorize } = require("../utils/authCheck");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const Category = require("../models/").Category;
const { protect } = require("../utils/jwtValidate");

const router = express.Router();


router.post("/cate", protect, authorize('planB'),catchAsyncErrors( async  (req, res, next) => {

    const{name, status} = req.body

    if(!name || !status){
        next(new AppError('please provide neccessary field', 403))
    }

    const NewCategory = await Category.create({
        name, 
        status
    })


  res.status(200).json({
    status: "sucess",
    NewCategory
  });
}));

router.get("/cate", protect, authorize('planB'),catchAsyncErrors( async  (req, res, next) => {

    const allCategory = await Category.findAll()


  res.status(200).json({
    status: "sucess",
    allCategory
  });
}));

module.exports = router;
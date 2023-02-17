const express = require("express");
const { authorize } = require("../utils/authCheck");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const Category = require("../models/").Category;
const { protect } = require("../utils/jwtValidate");

const router = express.Router();







router.post("/cate",protect, authorize('planB'),catchAsyncErrors( async  (req, res) => {


    const{name, status} = req.body

    const NewCategory = await Category.create({
        name, 
        status
    })


  res.status(200).json({
    status: "sucess",
    NewCategory
  });
}));

module.exports = router;
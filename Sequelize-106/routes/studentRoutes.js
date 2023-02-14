const express = require("express");
const StudentModel = require("../models").Student;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const AppError = require("../utils/appError");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const jwtToken = require("../utils/jwt");
const validateToken = require("../utils/jwtValidate.js");
const { protect } = require("../utils/jwtValidate.js");

const router = express.Router();

function comparePassword(param1, param2) {
  return bcrypt.compareSync(param1, param2);
}

router.post(
  "/student",
  catchAsyncErrors(async (req, res, next) => {
    const createStudent = await StudentModel.findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    });

    if (createStudent) {
      next(new AppError("User already exist", 403));
    } else {
      const { name, email, password, roll_no } = req.body;
      const newStudent = await StudentModel.create({
        name,
        email,
        roll_no,
        password: bcrypt.hashSync(password, 10),
      });
      return res.status(200).json({
        status: "success, User created successfully",
        data: newStudent,
      });
    }
  })
);

router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await StudentModel.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (user) {
      //create a token
      const token = await jwtToken(user);
      const passMatch = comparePassword(password, user.password);
      if (passMatch) {
        return res.status(200).json({
          status: "success",
          message: "User logged in successfully",
          data: user,
          token,
        });
      } else {
        token = undefined;
        return next(new AppError("Invalid credential , try again", 400));
      }
    } else {
      return next(new AppError("Invalid credential , try again", 400));
    }
  })
);

router.post('/profile', protect, (req, res, next)=>{

    res.status(200).json({
        data:req.user
    })



})
module.exports = router;

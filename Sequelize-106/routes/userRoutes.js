const express = require("express");
const { Op } = require("sequelize");
const User = require("../models/").User;
const Email = require("../models/").Email;
const AppError = require("../utils/appError");
const { authorize } = require("../utils/authCheck");
const bcrypt = require("bcrypt");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const sendEmail = require("../utils/email");
const jwtToken = require("../utils/jwt");
const { protect } = require("../utils/jwtValidate");
const crypto = require("crypto");

const router = express.Router();

router.post(
  "/user",
  catchAsyncErrors(async (req, res, next) => {
    const { name, password, phone_number } = req.body;

    const newUser = await User.create({
      name,
      phone_number,
      password: bcrypt.hashSync(password, 10),
    });
    return res.status(200).json({
      status: "sucess",
      data: await User.findByPk(newUser.id),
    });
  })
);

router.post(
  "/user/login",
  catchAsyncErrors(async (req, res, next) => {
    const { phone_number, password } = req.body;
    const user = await User.findOne({
      where: {
        phone_number: {
          [Op.eq]: phone_number,
        },
      },
    });
    console.log(  "heyyy user", user)

    if (!user) {
      return next(new AppError("Invalid credentials", 404));
    }

    const passwordChecker = await user.comparePassword(password, user.password);

    console.log(passwordChecker);

    if (!passwordChecker) {
      return next(new AppError("Invalid credentials", 404));
    }

    //create a tokene`

    const token = jwtToken(user);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: user,
      token,
    });
  })
);

router.get("/user", async (req, res) => {
  const allUser = await User.findAll({
    include: {
      model: Email,
    },
  });

  if (allUser.length < 1) {
    return res.status(200).json({
      status: "sucess",
      message: "No user SAVED yet !!!",
    });
  } else {
    return res.status(200).json({
      status: "sucess",
      data: allUser,
    });
  }
});
router.get("/plansb-offers", protect, authorize("planB"), async (req, res) => {
  return res.status(200).json({
    status: "sucess",
    message: "!!!",
  });
});

// @desc    Get current logged in User
// @route   /api/v1/auth/forgotpassword
// @access   public

router.post("/user/forgotpassword", async (req, res, next) => {
  const { phone_number, email } = req.body;

  const checkUserExist = await User.findOne({
    where: {
      phone_number,
    },
  });

  if (!checkUserExist) {
    return next(new AppError("This User does not exist", 404));
  }

  // get reset token
  const resetToken = checkUserExist.getResetPasswordToken();

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetpassword/${resetToken}`;

  const message = `you recieving this message because you or someone else requested for a password reset .... you link for reset is ${resetUrl}`;

  try {
    await sendEmail({
      email: email,
      subject: "your password reset link is valid for 10mins",
      message,
    });

    return res.status(200).json({
      status: "success",
      message: "link sent to email",
    });
  } catch (error) {
    checkUserExist.tokenToDefault();

    return next(new Error("There was error sending the Email", 500));
  }
});

// @desc    Reset Password
// @route     PUT  /api/v1/resetpassword/:resetToken
// 127.0.0.1:4500/api/v1/resetpassword/4
// @access   public

router.put(
  "/resetpassword/:resetToken",
  catchAsyncErrors(async (req, res, next) => {
    const { password } = req.body;

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
    console.log("userToken", passwordResetToken);

    const user = await User.findOne({
      where: {
        resetPasswordToken: passwordResetToken,
        resetPasswordExpire: { [Op.gt]: Date.now() },
      },
    });
    console.log(user);

    if (!user) {
      return next(new AppError(`Invalid Token`, 404));
    }
    // Set new number
    user.setpassword(password);

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  })
);

module.exports = router;

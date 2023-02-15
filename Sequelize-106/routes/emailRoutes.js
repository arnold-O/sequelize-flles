const express = require("express");
const Email = require("../models/").Email;
const { protect } = require("../utils/jwtValidate");

const router = express.Router();

router.post("/email", protect, async (req, res) => {
    console.log(req.user)

    const {emailAddress} = req.body

    const userEmail = await  Email.create({
        emailAddress,
        userId:req.user.id
    })
  res.status(200).json({
    status: "sucess",
    userEmail
  });
});

module.exports = router;
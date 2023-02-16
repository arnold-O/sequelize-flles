const express = require("express");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { protect } = require("../utils/jwtValidate");
const Comment = require("../models/").Comment;

const router = express.Router();






router.post("/comment/:postId", protect, catchAsyncErrors(async(req, res) => {
    console.log(req.user.id)
            const {comment_text} = req.body
            const {postId} = req.params

    const createComment = await Comment.create({
        comment_text,
        postId,
        userId:req.user.id
    })


  res.status(200).json({
    status: "sucess",
    createComment
  });
}));

module.exports = router;
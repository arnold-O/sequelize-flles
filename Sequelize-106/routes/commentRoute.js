const express = require("express");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const Comment = require("../models/").Comment;

const router = express.Router();






router.post("/comment/:postId", catchAsyncErrors(async(req, res) => {

            const {comment_text} = req.body
            const {postId} = req.params

    const createComment = await Comment.create({
        comment_text,
        postId
    })


  res.status(200).json({
    status: "sucess",
    createComment
  });
}));

module.exports = router;
const express = require("express");
const AppError = require("../utils/appError");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { protect } = require("../utils/jwtValidate");
const Comment = require("../models/").Comment;
const Post = require("../models/").Post;

const router = express.Router();

router.post(
  "/comment/:postId",
  protect,
  catchAsyncErrors(async (req, res, next) => {
    const { comment_text } = req.body;
    const { postId } = req.params;

const posIdCheck = await Post.findByPk(postId);


    if (!posIdCheck) {
      return next(new AppError("Post does not exist", 404));
    }

    const createComment = await Comment.create({
      comment_text,
      postId,
      userId: req.user.id,
    });

    res.status(200).json({
      status: "sucess",
      createComment,
    });
  })
);

module.exports = router;

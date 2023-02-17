const express = require("express");
const { Op } = require("sequelize");
const AppError = require("../utils/appError");
const Category = require("../models/").Category;
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { protect } = require("../utils/jwtValidate");
const Post = require("../models/").Post;
const User = require("../models/").User;
const Comment = require("../models/").Comment;

const router = express.Router();

router.post(
  "/post/:categoryId",
  protect,
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.categoryId);
    const { name, content } = req.body;
    const { categoryId } = req.params;

    const newPost = await Post.create({
      name,
      content,
      categoryId,
      userId: req.user.id,
    });
    res.status(200).json({
      status: "sucess",
      newPost,
    });
  })
);

/* 
    @GET     *get all post route,
    Protected, must be logged in

*/

router.get(
  "/post",
  protect,
  catchAsyncErrors(async (req, res, next) => {
    console.log("post req.query...", req.query);
    const allPost = await Post.findAll({
      include: [
        { model: User },
        {
          model: Comment,
          include: {
            model: User,
          },
        },
        { model: Category },
      ],
    });

    const doc = allPost;

    res.status(200).json({
      status: "sucess",
      allPost,
    });
  })
);
router.get(
  "/postfind",

  catchAsyncErrors(async (req, res, next) => {
    let allPost;
    if (req.query.name) {
      allPost = await Post.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        },
      });
    } else {
      allPost = await Post.findAll({
        where: {
          content: {
            [Op.like]: [`%${req.query.content}%`],
          },
        },
      });
    }

    const doc = allPost;

    res.status(200).json({
      status: "sucess",
      allPost,
    });
  })
);

/* 
    @GET     *get all post by a particular logged in user,
    Protected, must be logged in

*/
router.get(
  "/userpost",
  protect,
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.user);
    const allPost = await Post.findAll({
      where: {
        userId: {
          [Op.eq]: req.user.id,
        },
      },
      include: [{ model: User }],
    });

    res.status(200).json({
      status: "sucess",
      allPost,
    });
  })
);
router.put(
  "/post/:postId",
  protect,
  catchAsyncErrors(async (req, res, next) => {
    const { name, content } = req.body;
    const { postId } = req.params;

    const postCheck = await Post.findOne({
      where: {
        id: {
          [Op.eq]: postId,
        },
        userId: {
          [Op.eq]: req.user.id,
        },
      },
    });

    console.log("logged user ----", postCheck);

    if (!postCheck) {
      return next(
        new AppError(
          "Can't update another user's Post or Post not available",
          404
        )
      );
    }

    const updateValues = await Post.update(
      {
        name: req.body.name,
        content: req.body.content,
      },
      {
        where: {
          id: postId,
        },
      }
    );

    res.status(200).json({
      status: "sucess",
      updateValues,
    });
  })
);

module.exports = router;

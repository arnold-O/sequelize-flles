const express = require("express");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { protect } = require("../utils/jwtValidate");
const Post = require("../models/").Post;
const User = require("../models/").User;

const router = express.Router();

router.post("/post", protect, catchAsyncErrors( async (req, res, next) => {
    console.log(req.user)

    const {name, content} = req.body

   const  newPost = await Post.create({
        name,
        content,
        userId:req.user.id

    })
    const doc = {
        name : newPost.name,
        content : newPost.content
    }
  res.status(200).json({
    status: "sucess",
    doc
  });
}));


router.get('/post', protect, catchAsyncErrors( async(req, res, next)=>{

    const allPost = await Post.findAll({ 
        include: [{
            model:User,
          
            attributes: ['name', 'id']
         
        }]
    });

    const doc = allPost
   
    res.status(200).json({
        status: "sucess",
        allPost
      });
}

))

module.exports = router;
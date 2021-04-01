const express = require("express");
const router = express.Router();

// gives access to the middleware
const asyncHandler = require("express-async-handler");

const Post = require("../models/Post");

//protective middleware
const { protect } = require("../../middleware/auth");

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello User Routes" });
});
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user");
  res.json({ posts });
});
router.get(
  "/:id/feed",
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    const posts = await Post.find({ feedId: id }).populate("user");
    res.json({ posts });
  })
);
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const post = await Post.findById(id).populate("user comments.user");
  res.json({ post });
});
router.post(
  "/:id/create",
  protect,
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { user } = req;
    let { photos, description, feedId, author } = req.body;

    console.log(req.body);
    console.log(id);

    if (photos.length <= 0) {
      res.status(401);
      throw new Error("Please upload at least one image");
    } else {
      let newPost = new Post({
        description,
        photos,
        user: user._id,
        feedId: id,
      });

      let savedPost = await newPost.save();

      savedPost = await savedPost.populate("user ").execPopulate();
      res.json(newPost);
      // res.json(savedPost);
    }
    // const post = await Post.findById(id).populate("user");
    // res.json({ post });
  })
);
router.post(
  "/:id/comment/create",
  protect,
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { user } = req;
    let { comment } = req.body;

    if (comment === "") {
      res.status(500);
      throw new Error("Please add text to your comment");
    } else {
      let post = await Post.findById(id);

      console.log(post);
      let newComment = {
        comment,
        user: user._id,
        post: id,
      };

      post.comments.push(newComment);

      console.log(post.comments);

      let savedPost = await post.save();

      savedPost = await savedPost.populate("user comments.user").execPopulate();
      res.status(200).json(savedPost);
    }
    // res.json({ hello: "Goodbye" });
  })
);
router.post(
  "/:id/like/add",
  protect,
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { user } = req;

    if (id === "") {
      res.status(500);
      throw new Error("You cannot like an empty post");
    } else {
      let post = await Post.findById(id);

      let { likes } = post;

      //checking if the user already likes the post
      let postAlreadyLiked = likes.some(
        (like) => like.user.toString() === user._id.toString()
      );
      console.log(postAlreadyLiked);

      if (!postAlreadyLiked) {
        let newLike = {
          user: user._id,
        };

        post.likes.push(newLike);

        console.log(post.likes);

        let savedPost = await post.save();
        savedPost = await savedPost
          .populate("user comments.user")
          .execPopulate();
        res.status(200).json(savedPost);
      } else {
        res.status(500);
        throw new Error("You cannot like the same post mulple times");
      }
      // res.status(500);
    }
  })
);
router.post(
  "/:id/like/remove",
  protect,
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { user } = req;

    if (id === "") {
      res.status(500);
      throw new Error("You cannot unlike an empty post");
    } else {
      let post = await Post.findById(id);

      let { likes } = post;

      //filtering the other likes from the current user
      let updatedLikes = likes.filter(
        (like) => like.user.toString() !== user._id.toString()
      );

      post.likes = updatedLikes;

      //   console.log(post.likes);

      let savedPost = await post.save();
      savedPost = await savedPost.populate("user comments.user").execPopulate();
      res.status(200).json(savedPost);
    }
  })
);

module.exports = router;

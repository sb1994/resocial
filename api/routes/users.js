const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
//function to create the auth token
const createToken = require("../../utils/createToken");

const bcrypt = require("bcryptjs");
// gives access to the middleware
const asyncHandler = require("express-async-handler");

const User = require("../models/User");

//protective middleware
const { protect } = require("../../middleware/auth");

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello User Routes" });
});
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ users });
});
router.get("/profile/:id", async (req, res) => {
  let { id } = req.params;
  const user = await User.findById(id);
  res.json({ user });
  // res.json("hello");
});
router.post(
  "/profile/:id/follow",
  protect,
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { user } = req;
    const currentUser = await User.findById(user._id);
    const searchedUser = await User.findById(id);

    let { following } = currentUser;
    let { followers } = searchedUser;

    // checking if the followee's is in the current users following list
    let followingIds = following.filter(
      (user) =>
        //checking if the user exists
        user.user === id
    );

    //checking if the current user is in the followee's follower list
    let followerIds = followers.filter(
      (follower) =>
        //checking if the user exists
        follower.user === user._id
    );

    console.log(followerIds, followingIds);

    if (followingIds.length > 0 && followerIds.length > 0) {
      console.log("user is already following this user");
      throw new Error("user is already following this user");
    } else {
      //adding to the currentUser following list
      let addedFollow = { user: searchedUser._id };
      currentUser.following.push(addedFollow);

      // adding the currentUser to the followees followers list
      let addedFollower = {
        user: user._id,
      };
      searchedUser.followers.push(addedFollower);

      //   // saving both updatedUsers
      let updatedCurrentUser = await currentUser.save();
      let updatedSearchedUser = await searchedUser.save();

      console.log(updatedCurrentUser, updatedSearchedUser);
      res.json({
        searchedUser: updatedSearchedUser,
        currentUser: updatedCurrentUser,
      });
      // res/
    }
  })
);
router.post(
  "/profile/:id/unfollow",
  protect,
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { user } = req;
    const searchedUser = await User.findById(id);
    const currentUser = await User.findById(user._id);

    console.log(searchedUser.firstName, searchedUser.followers);
    console.log("Me", currentUser.following);
    // updating current users following list
    // let updatedFollowingList = currentUser.following.filter(
    //   // (user) => user.user === id
    //   (followee) => followee.user.toString() !== id.toString()
    //   // followee.user !== id;
    // );

    // // // // updating the followees followers list
    // let updatedFollowerList = searchedUser.followers.filter(
    //   (follower) => follower.user.toString() !== user._id.toString()
    //   // console.log(follower.user === user._id);
    // );
    let updatedFollowingList = currentUser.following.filter(
      // (user) => user.user === id
      (followee) => followee.user.toString() !== id.toString()
      // followee.user !== id;
    );

    // // // updating the followees followers list
    let updatedFollowerList = searchedUser.followers.filter(
      (follower) => follower.user.toString() !== user._id.toString()
      // console.log(follower.user === user._id);
    );

    console.log(searchedUser._id, searchedUser.firstName, updatedFollowerList);
    console.log(currentUser._id, "me", updatedFollowingList);
    // console.log(updatedFollowingList);
    // if (updatedFollowerList.length > 0 && updatedFollowingList.length > 0) {
    //   console.log("Already following this user can unfollow");
    currentUser.following = updatedFollowingList;
    searchedUser.followers = updatedFollowerList;
    // } else {
    //   console.log("cannot unfollow someone who isnt followed");
    // }

    let updatedSearchedUser = await searchedUser.save();
    let updatedCurrentUser = await currentUser.save();

    // res.json({ currentUser, searchedUser });
    res.json({
      currentUser: updatedCurrentUser,
      searchedUser: updatedSearchedUser,
    });
    // res.json({
    //   currentUser,
    //   searchedUser,
    // });
  })
);
router.get(
  "/profile/:id/followers",
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    const followers = await User.findById(id)
      .populate("followers.user")
      .select("-password");

    res.json({
      followers,
    });
  })
);
router.post(
  "/profile/edit",
  protect,
  asyncHandler(async (req, res) => {
    let { firstName, lastName, photo } = req.body;

    console.log(req.body);

    // cuurent user to be updated
    let currentUser = await User.findById(req.user._id);

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.profile_pic = photo;

    console.log(currentUser);

    let user = currentUser.save();
    res.json(user);
  })
);
router.get(
  "/profile/:id/following",
  asyncHandler(async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const following = await User.findById(id)
      .populate("following.user")
      .select("-password");

    res.json({
      following,
    });
  })
);
router.get(
  "/current",
  protect,
  asyncHandler(async (req, res) => {
    // console.log(req.user);
    let { _id } = req.user;
    // console.log(req.user);
    //find the user by email
    const user = await User.findById(_id).select("-password");
    // console.log(user);

    //if the user exist we then check the password

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      res.json(user).status(200);
    }
  })
);
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    // console.log(req);
    let { email, password, firstName, lastName } = req.body;
    console.log(req.body);
    // find the user by email
    const userExists = await User.findOne({ email });
    //if the user exist we then check the password
    if (userExists) {
      res.status(401);
      throw new Error("User email already exists");
    } else {
      //check if the password was sent in the request
      if (!password) {
        res.status(401);
        throw new Error("Password cannot be empty");
      } else {
        //create the new user
        const newUser = new User({
          email,
          password,
          firstName,
          lastName,
        });
        //create the hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        // adds the hased password to the user object to be saved
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        res
          .json({
            savedUser,
            token: createToken(savedUser._id),
          })
          .status(200);
      }
    }
  })
);
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // console.log(req);
    let { email, password } = req.body;
    console.log(req.body);
    // find the user by email
    const userExists = await User.findOne({ email });
    console.log(userExists);
    //if the user exist we then check the password
    if (!userExists) {
      res.status(401);
      throw new Error("User email doesnt exist");
    } else {
      //check if the password was sent in the request
      if (!password) {
        res.status(401);
        throw new Error("Password cannot be empty");
      } else {
        const match = await bcrypt.compare(password, userExists.password);
        console.log(match);

        if (match) {
          const payload = {
            _id: userExists._id,
          };

          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 * 1000 * 1000 * 20,
          });

          res.json({
            userExists,
            token,
          });
        }
      }
    }
  })
);
module.exports = router;

const express = require("express");
const router = express.Router();

//function to create the auth token
const createToken = require("../../utils/createToken");

const bcrypt = require("bcryptjs");
// gives access to the middleware
const asyncHandler = require("express-async-handler");

const User = require("../models/User");

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello User Routes" });
});
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
module.exports = router;

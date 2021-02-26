const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  profile_pic: {
    type: String,
    default:
      "https://www.willierippleevents.com/wp-content/uploads/2016/01/Dummy-Profile-Picture-300x300.jpg",
  },
  activityStatus: {
    type: String,
    default: "offline",
  },
});

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    default: "",
  },
  photos: [
    {
      type: String,
      required: "Please select image",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply an author",
  },
  feedId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply an author",
  },
  likes: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  tags: {
    type: Array,
    default: [],
  },
  comments: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);

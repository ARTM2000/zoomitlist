const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  kind: {
    required: true,
    type: String,
  },
  postTitle: {
    required: true,
    type: String,
  },
  postLink: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  postImage: {
    required: true,
    type: String,
  },
  postImageAlt: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  summeryDescription: {
    required: true,
    type: String,
  },
  commentsCount: {
    type: Number,
    required: true,
  },
  categories: [String]
}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);
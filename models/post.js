const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");

const postSchema = new mongoose.Schema(
  {
    user: [User.userSchema],
    location: {
      required: true,
      type: String,

      default: "Planet earth",
    },
    img: {
      url: String,
      filename: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    caption: {
      required: true,
      type: String,
    },
    details: {
      scientificName: { type: String },
      age: { type: Number, min: 0, default: 0 },
      petname: { type: String, default: "Beauriful Plant" },
      originalFrom: { type: String, default: "Planet earth" },
      care: {
        type: String,
        default: "Lots of love and fair amount of water and natural light",
      },
    },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};

const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

// you are working on finding all posts by  user.
const getPostsByUser = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.Post.findById(id)
    .populate("comments")
    .populate("user");
  const user = post.user;
  const allPostsByUser = await Post.Post.find({
    "user.user": { $in: [user[0].user] },
  });
  res.render("users/all-posts-by-user", {
    allPostsByUser,
  });
};

module.exports = {
  getPostsByUser,
};

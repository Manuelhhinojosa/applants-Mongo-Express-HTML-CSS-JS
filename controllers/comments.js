const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const getNewCommnentForm = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.Post.findById(id);
  console.log(post);
  res.render("comments/add-comment-form", {
    post,
  });
};

const createNewComment = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.Post.findById(id);
  const comment = new Comment(req.body);
  await comment.save();
  //   console.log("this is the post before pushing", post);
  //   console.log("this is the comment", comment);
  post.comments.push(comment._id);
  console.log("this is the comment after pushing", post);
  await post.save();

  res.redirect(`/applants/posts/${id}`);
};

const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  console.log("this is the comment", comment);
  const post = await Post.Post.find({ comments: comment });
  console.log("this is the post", post);

  res.redirect(`/applants/posts/${post[0]._id}`);
};

module.exports = {
  getNewCommnentForm,
  createNewComment,
  deleteComment,
};

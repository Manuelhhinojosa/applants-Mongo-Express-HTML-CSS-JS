const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const middleware = require("../middleware/middleware");

const getHome = async (req, res, next) => {
  res.render("posts/home");
};

const getPosts = async (req, res, next) => {
  const posts = await Post.Post.find({}).populate("comments").populate("user");
  const allPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
  console.log(allPosts);
  res.render("posts/all-posts", {
    allPosts,
  });
};

const getOnePost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.Post.findById(id).populate("comments");
  console.log(post);
  res.render("posts/one-post", {
    post,
  });
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const postToDelete = await Post.Post.findById(id)
    .populate("comments")
    .populate("user");
  await Post.Post.deleteOne({ _id: id });
  console.log("this is the post:", postToDelete);
  await User.User.deleteOne({ _id: postToDelete.user[0]._id });
  const commentsIds = [];
  for (let i = 0; i < postToDelete.comments.length; i++) {
    commentsIds.push(postToDelete.comments[i]._id);
  }
  await Comment.deleteMany({ _id: { $in: commentsIds } }); // here
  await middleware.cloudinary.uploader.destroy(postToDelete.img.filename);
  res.redirect("/applants/posts");
};

const getNewPostForm = async (req, res, next) => {
  res.render("posts/new-post-form");
};

const addPost = async (req, res, next) => {
  console.log(req.file);
  const data = req.body.user.toLowerCase();
  const user = await new User.User({ user: data });
  const newPost = await new Post.Post({
    user: user,
    location: req.body.location,
    img: {
      url: req.file.path,
      filename: req.file.filename,
    },
    caption: req.body.caption,
    details: {
      scientificName: req.body.scientificName,
      age: req.body.age,
      petname: req.body.petname,
      originalFrom: req.body.originalFrom,
      care: req.body.care,
    },
  });
  await user.save();
  await newPost.save();
  res.redirect("/applants/posts");
};

const getEditPostForm = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.Post.findById(id);
  console.log(post);
  res.render("posts/edit-post-form", {
    post,
  });
};

const editPost = async (req, res, next) => {
  console.log("this is the new info", req.body);
  const { id } = req.params;
  const post = await Post.Post.findOneAndUpdate(
    { _id: id },
    {
      location: req.body.location,
      img: req.body.image,
      caption: req.body.caption,
      details: {
        scientificName: req.body.scientificName,
        age: req.body.age,
        petname: req.body.petname,
        originalFrom: req.body.originalFrom,
        care: req.body.care,
      },
    }
  );
  console.log(post);
  res.redirect(`/applants/posts/${post._id}`);
};

const addLike = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.Post.findById(id);
  post.likes += 1;
  console.log(post);
  await post.save();
  res.redirect("/applants/posts");
};

module.exports = {
  getHome,
  getPosts,
  getOnePost,
  deletePost,
  getNewPostForm,
  addPost,
  getEditPostForm,
  editPost,
  addLike,
};

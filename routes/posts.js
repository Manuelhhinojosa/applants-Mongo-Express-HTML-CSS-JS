var express = require("express");
var router = express.Router();
const postsController = require("../controllers/posts");
const middleware = require("../middleware/middleware");

router.get("/", postsController.getHome);
router.get("/posts", postsController.getPosts);
router.get("/posts/:id", postsController.getOnePost);
router.post("/posts/:id", postsController.addLike);
router.delete("/posts/:id", postsController.deletePost);
router.get("/posts/:id/new", postsController.getNewPostForm);
router.post(
  "/posts/:id/new",
  middleware.upload.single("image"),
  postsController.addPost
);
router.get("/posts/:id/edit", postsController.getEditPostForm);
router.put("/posts/:id/edit", postsController.editPost);

module.exports = router;

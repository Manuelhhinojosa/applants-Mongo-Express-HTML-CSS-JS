const express = require("express");
const { route } = require(".");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.get(
  "/applants/posts/:id/newcomment",
  commentsController.getNewCommnentForm
);

router.post(
  "/applants/posts/:id/newcomment",
  commentsController.createNewComment
);

router.delete("/applants/posts/delete/:id", commentsController.deleteComment);

module.exports = router;

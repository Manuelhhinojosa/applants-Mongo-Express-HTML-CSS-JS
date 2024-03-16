const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/applants/posts/:id/user", usersController.getPostsByUser);

module.exports = router;

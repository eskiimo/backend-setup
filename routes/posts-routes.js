const express = require("express");
const postsControllers = require("../controllers/posts-controllers");
// file upload ready middelware
// const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", postsControllers.getPosts);

router.get("/:postId", postsControllers.getPostById);

router.post("/", postsControllers.createPost);

module.exports = router;

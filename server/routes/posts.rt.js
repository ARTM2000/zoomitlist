const express = require("express");

const postsController = require("../controllers/posts.ct")

const router = express.Router();

router.get("/new-posts", postsController.getNewPosts);
router.get("/medium-hot", postsController.getHotMediumPosts);
router.get("/small-hot", postsController.getHotSmallPosts);

router.get("/hot-posts", postsController.getAllHotPosts);

router.get("/categories", postsController.getCategories)

module.exports = router;
const express = require("express");

const searchController = require("../controllers/search.ct");

const router = express.Router();

router.get("/content", searchController.getPostsByQuery);
router.get("/content-catg", searchController.getPostsByCategories);

module.exports = router;
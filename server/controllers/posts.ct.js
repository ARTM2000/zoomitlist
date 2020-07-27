const mongoose = require("mongoose");

const Post = require("../models/post.model");
const BUPost = require("../models/buPost.model");
const UpdateTime = require("../models/updateTime.model");
const Categories = require("../models/categories.model");

const selectBetweenPosts = async () => {
  const currentDate = new Date();

  let timesRecord;
  try {
    timesRecord = await UpdateTime.find();
  } catch (err) {
    console.log(err);
    return BUPost;
  }
  const lastTimeRecord = timesRecord[timesRecord.length - 1];

  if (lastTimeRecord) {
    // console.log("updateTime", lastTimeRecord)
    const nextUpdateTime = new Date(+lastTimeRecord.nextTime);
    if (currentDate.getTime() < nextUpdateTime.getTime()) {
      // console.log("Post")
      return Post;
    } else {
      // console.log("buPost")
      return BUPost;
    }
  } else {
    throw Error("Some problem on getting time document");
  }
};

exports.getNewPosts = async (req, res, next) => {
  let correctPosts;
  try {
    correctPosts = await selectBetweenPosts();
  } catch (err) {
    console.log(err);
  }

  const page = req.query.page;

  if (page) {
    const skipContent = 20 * (page - 1);

    let posts;

    try {
      posts = await correctPosts.find().skip(skipContent).limit(20);
    } catch (err) {
      console.log(err);
    }

    if (posts) {
      let update;
      try {
        update = await UpdateTime.find();
      } catch (err) {
        console.log(err);
      }
      const updateTime = update[update.length - 1];

      const forwardSkip = 20 * page;
      let forwardPosts;
      try {
        forwardPosts = await correctPosts.find().skip(forwardSkip).limit(20);
      } catch (err) {
        console.log(err);
      }
      const hasMore =
        forwardPosts.length <= 20 && forwardPosts.length > 0 ? true : false;
      let response = {
        posts,
        hasMore,
        updateTime,
      };

      res.json(response).status(200);
      console.log("response sent" + page);
    } else {
      const error = new Error(
        "Server Problem: db | Posts did not fetch correctly"
      );
      error.status = 500;
      next(error);
    }
  } else {
    const error = new Error("Page query did not send");
    error.status = 401;
    next(error);
  }
};

exports.getHotMediumPosts = async (req, res, next) => {
  let correctPosts;
  try {
    correctPosts = await selectBetweenPosts();
  } catch (err) {
    console.log(err);
  }

  let postsIndex = 100;

  let latestPost;

  try {
    latestPost = await correctPosts.find({ kind: "medium" }).limit(postsIndex);
  } catch (err) {
    console.log(err);
  }

  if (latestPost) {
    latestPost.sort((a, b) => b.commentsCount - a.commentsCount);
    res.json(latestPost.slice(0, 6)).status(200);
  } else {
    const error = new Error(
      "Server Problem: db | Medium posts did not fetch correctly"
    );
    error.status = 500;
    next(error);
  }
};

exports.getHotSmallPosts = async (req, res, next) => {
  let correctPosts;
  try {
    correctPosts = await selectBetweenPosts();
  } catch (err) {
    console.log(err);
  }

  let postsIndex = 200;

  let latestPost;
  try {
    latestPost = await correctPosts.find({ kind: "small" }).limit(postsIndex);
  } catch (err) {
    console.log(err);
  }

  if (latestPost) {
    latestPost.sort((a, b) => b.commentsCount - a.commentsCount);
    res.json(latestPost.slice(0, 6)).status(200);
  } else {
    const error = new Error(
      "Server Problem: db | Small posts did not fetch correctly"
    );
    error.status = 500;
    next(error);
  }
};

exports.getAllHotPosts = async (req, res, next) => {
  let correctPosts;
  try {
    correctPosts = await selectBetweenPosts();
  } catch (err) {
    console.log(err);
  }

  console.log("on responding");
  const inPostLimit = +req.query.limit || 1000;
  const page = +req.query.page ? req.query.page : 1;
  const postInPageCount = 20;

  const startingIndex = (page - 1) * postInPageCount;
  const endingIndex = page * postInPageCount - 1;
  let posts;
  if (inPostLimit > 0 && inPostLimit < 15000) {
    try {
      posts = await correctPosts.find().limit(inPostLimit);
    } catch (err) {
      console.log(err);
    }
  }

  if (posts) {
    console.log(`hot-posts page = ${page}`);
    posts.sort((a, b) => b.commentsCount - a.commentsCount);

    const respondPosts = posts.slice(startingIndex, endingIndex);
    res.json(respondPosts);
  } else {
    const error = new Error(
      "Server problem: db | Can not fetch data from database"
    );
    error.status = 500;
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  let categories;
  try {
    categories = await Categories.find();
  } catch (err) {
    console.log(err);
  }

  if (categories) {
    const latestCategories = categories[categories.length - 1];
    res.json(latestCategories).status(200);
  } else {
    const error = new Error(
      "Server problem: db | Can not fetch data from database"
    );
    error.status = 500;
    next(error);
  }
};

// add a new model for back-up posts collection
// set a checker function for switching between posts collection --> done

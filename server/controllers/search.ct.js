const Post = require("../models/post.model");
const BUPost = require("../models/buPost.model");
const UpdateTime = require("../models/updateTime.model");

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
    const nextUpdateTime = new Date(+lastTimeRecord.nextTime);
    if (currentDate < nextUpdateTime) {
      return Post;
    } else {
      return BUPost;
    }
  } else {
    throw Error("Some problem on getting time document");
  }
};

exports.getPostsByQuery = async (req, res, next) => {
  let correctPosts;
  try {
    correctPosts = await selectBetweenPosts();
  } catch (err) {
    console.log(err);
  }

  const search = req.query.search;
  const page = +req.query.page || 1;
  const contentOnPage = 20;

  const startAt = (page - 1) * contentOnPage;
  const endAt = page * contentOnPage - 1;

  if (search) {
    console.log(`on searching for ${search} on page ${page}`);
    const regex = new RegExp(
      "\\s+" + search + "\\s+|\\s+" + search + "$|^" + search + "\\s+"
    );

    let foundContent;
    try {
      foundContent = await correctPosts.find({
        postTitle: { $regex: regex, $options: "ig" },
      });
    } catch (err) {
      console.log(err);
    }

    if (foundContent) {
      const responseContent = foundContent.slice(startAt, endAt);
      const contentFound = foundContent.length;

      const response = {
        content: responseContent,
        count: contentFound,
      };

      res.json(response);
      console.log(`response on searching ${search} sent`);
    } else {
      const error = {
        message:
          "Server problem: db | Server could not fetch data from database",
        status: 500,
      };
      next(error);
    }
  } else {
    const error = {
      message: "Client problem: query | Necessary queries did not found",
      status: 401,
    };
    next(error);
  }
};

exports.getPostsByCategories = async (req, res, next) => {
  let correctPosts;
  try {
    correctPosts = await selectBetweenPosts();
  } catch (err) {
    console.log(err);
  }

  console.log("on sending catgs content");
  const catg = req.query.catg;
  const page = +req.query.page || 1;
  const contentOnPage = 20;

  const startAt = (page - 1) * 20;
  const endAt = page * contentOnPage - 1;

  if (catg) {
    const categoriesArr = catg.split("-");
    let content;

    try {
      content = await correctPosts.find({ categories: { $in: categoriesArr } });
    } catch (err) {
      console.log(err);
    }

    if (content) {
      const responseContent = content.slice(startAt, endAt);
      const contentFound = content.length;

      const response = {
        content: responseContent,
        count: contentFound,
      };
      console.log(`catgs content ${page} sent ${catg}`);
      res.json(response);
    } else {
      const error = {
        message:
          "Server problem: db | Server could not fetch data from database",
        status: 500,
      };
      next(error);
    }
  } else {
    const error = {
      message: "Client problem: query | Necessary queries did not found",
      status: 401,
    };
    next(error);
  }
};

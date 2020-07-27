const mongoose = require("mongoose");

const Post = require("../models/post.model");
const BUPost = require("../models/buPost.model");
const UpdateTime = require("../models/updateTime.model");
const Categories = require("../models/categories.model");
const scraper = require("../scrapers/first-scrap");

//getting data from request
const makeRequest = async (page = 1, count = 1) => {
  let DATA = await scraper.scrapSite(page, count);
  //   console.log(DATA);
  return DATA;
};

//try to pass website not responding situation
const tryRequest = async (page) => {
  const data = await makeRequest(page);
  let tried = 2,
    newInfo,
    info;

  if (data) {
    info = data;
  } else {
    //in case of website no respond
    for (; tried <= 100000000000000000000000000000 && !newInfo; tried++) {
      newInfo = await makeRequest(page, tried);
      if (newInfo) break;
    }
    if (newInfo) {
      info = newInfo;
    } else {
      info = {
        message: "**********\nWebsite did not send any respond\n**********",
        data: false,
      };
    }
  }
  // console.log(info);
  return info;
};

//storing post content to server
const storePost = async (post) => {
  const kind = post.kind;
  const postTitle = post.postTitle;
  const postLink = post.postLink;
  const author = post.author;
  const postImage = post.postImage;
  const postImageAlt = post.postImageAlt;
  const date = post.date;
  const summeryDescription = post.summeryDescription;
  const commentsCount = post.commentsCount;
  const categories = post.categories;

  const newPost = new Post({
    kind,
    postTitle,
    postLink,
    author,
    postImage,
    postImageAlt,
    date,
    summeryDescription,
    commentsCount,
    categories,
  });

  let savedPost;

  try {
    savedPost = await newPost.save();
  } catch (err) {
    console.log(err);
  }

  // return new Promise((resolve, reject) => {
  //   if (savedPost) {
  //     resolve(true);
  //   } else {
  //     reject("Some problem happened");
  //   }
  // })

  if (savedPost) {
    return true;
  } else {
    return false;
  }
};

//storing this page contents to the database
const gatheringData = async (page) => {
  const pageData = await tryRequest(page);
  if (!pageData.data) {
    pageData.forEach(async (el, index) => {
      let shouldRepeat;
      let value;
      do {
        value = await storePost(el)
        shouldRepeat = !value;
      } while (shouldRepeat);
      console.log(
        `page ${
          page < 10
            ? page + "   "
            : page < 100
            ? page + "  "
            : page < 1000
            ? page + " "
            : page
        } content ${index + 1 < 10 ? index + 1 + " " : index + 1} stored`
      );
    });
  }
};

//Looping through https://www.zoomit.ir from page 1-500
exports.loopThroughSite = async () => {
  console.log("updating process started");
  //removing last collection
  let startDate = new Date();

  let posts;
  try {
    posts = await Post.findOne();
  } catch (err) {
    console.log(err);
  }

  console.log("posts existence checked");

  // console.log(posts)
  let removed;
  let tryingStep = 0;

  if (posts) {
    do {
      try {
        removed = await mongoose.connection.db.dropCollection("posts");
      } catch (err) {
        console.log(err);
      }

      tryingStep++;
      if (tryingStep > 150) break;
    } while (!removed);
  } else removed = true;

  console.log("dropping process done");
  //in case that removing process successful, should start updating
  if (removed) {
    for (let page = 1; page <= 1000; page++) {
      await gatheringData(page);
    }
    let endDate = new Date();

    //save the process time into server

    let saveProcessTime;
    let updateTimes;
    try {
      updateTimes = await UpdateTime.find();
    } catch (err) {
      console.log(err);
    }

    if (updateTimes.length >= 20 && updateTimes) {
      try {
        saveProcessTime = await mongoose.connection.db.dropCollection(
          "updatetimes"
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      saveProcessTime = true;
    }
    if (saveProcessTime) {
      const updateTime = new UpdateTime({
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
        spentTime: `${
          (endDate.getTime() - startDate.getTime()) / 1000
        } seconds`,
        nextTime: startDate.getTime() + 10800000, // in looping by 3 hours
      });

      try {
        await updateTime.save();
      } catch (err) {
        console.log(err);
      }
    }
    console.log(
      `The process got ${endDate / 1000 - startDate / 1000} second long`
    );

    //getting content Categories
    await getAllCategories();

    // updating the back-up posts
    setTimeout(async () => await this.updateBUPost(), 300000);
    console.log("buPosts updated ^_^ ");
  }
};

const getAllCategories = async () => {
  const categories = [];

  let CATEGORIES;
  try {
    CATEGORIES = await Categories.find();
  } catch (err) {
    console.log(err);
  }

  let catgsShouldUpdate;
  if (CATEGORIES.length > 50 && CATEGORIES) {
    try {
      catgsShouldUpdate = await mongoose.connection.db.dropCollection(
        "categories"
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    catgsShouldUpdate = true;
  }

  if (catgsShouldUpdate) {
    console.log("is setting categories");
    let CONTENTS;
    try {
      CONTENTS = await Post.find();
    } catch (err) {
      console.log(err);
    }

    CONTENTS.forEach((el) => {
      el.categories.forEach((catg) => {
        let changeIndex;

        const isThere = categories.find((saved, index) => {
          if (catg === saved.name) {
            changeIndex = index;
          }
          return catg === saved.name;
        });

        if (!isThere) {
          categories.push({ name: catg, count: 1 });
        } else {
          categories[changeIndex].count++;
        }
      });
    });

    const categoriesForSave = new Categories({
      categories,
    });
    let savedCategories;
    try {
      savedCategories = await categoriesForSave.save();
    } catch (err) {
      console.log(err);
    }
    if (savedCategories) {
      console.log("categories collection updated");
    }
  }
};

exports.updateBUPost = async () => {
  console.log("updating the back-up collection...");
  let buPosts;

  try {
    buPosts = await BUPost.findOne();
  } catch (err) {
    console.log(err);
  }

  console.log("On getting Posts...");

  // const collectionCount = 1000;
  // let skip = 0;

  let posts;

  try {
    posts = await Post.find();
  } catch (err) {
    console.log(err);
  }
  //   .limit(collectionCount)
  //   .skip(skip * collectionCount);
  // skip++;
  console.log("Posts Stored");

  let removed;
  if (buPosts) {
    try {
      removed = await mongoose.connection.db.dropCollection("buposts");
      console.log("buPosts collection dropped");
    } catch (err) {
      console.log(err);
    }
  } else {
    removed = true;
  }

  if (removed) {
    console.log("Start to updating buPosts");

    // for (; posts.length > 0; skip++) {
    //   let shouldContinue = false;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );

    const storeFunction = (lastIndex) => {
      const fixCount = 6000;

      const startF = lastIndex;
      const endAt = startF + fixCount;

      const __Posts = posts.slice(startF, endAt);

      __Posts.length > 0 &&
        __Posts.forEach((el, index) => {
          if (el) {
            const buPost = new BUPost({
              kind: el.kind,
              postTitle: el.postTitle,
              postLink: el.postLink,
              author: el.author,
              postImage: el.postImage,
              postImageAlt: el.postImageAlt,
              date: el.date,
              summeryDescription: el.summeryDescription,
              commentsCount: +el.commentsCount,
              categories: el.categories,
            });

            buPost
              .save()
              .then(() => console.log(`${startF + index + 1} buPost stored`))
              .catch((err) => console.log(err));
          }
        });

      return {
        nextIndex: endAt,
        shouldContinue: endAt < posts.length - 1
      }
    };

    let continueData = storeFunction(0);
    const savingInterval = setInterval(() => {
      console.log("on getting buPosts...")
      continueData = storeFunction(continueData.nextIndex);
      if(!continueData.shouldContinue) {
        console.log("ending the interval")
        clearInterval(savingInterval);
      }
    }, 700000);

  }
};

const fs = require("fs");
const path = require("path");

const axios = require("axios").default;
const cheerio = require("cheerio");

exports.scrapSite = async (pageNumber = 1) => {
  const jsonData = [];
  // requestCount++;
  let html;
  try {
    html = await axios.get(`https://www.zoomit.ir/page/${pageNumber}`);
  } catch (err) {
    console.error(err);
    return false;
  }
  if (html.data && html.status === 200) {
    console.log("respond received");

    const $ = cheerio.load(html.data);

    let contentListAll = $(".bg-white.clearfix.mrg15B");

    //new kind of scarping
    contentListAll.find(".row").each((index, contentList) => {
      // console.log(index);
      // console.log($(contentList).html());

      if ($(contentList).find(".item-list-wide-row").html()) {

        const el = $(contentList);
        const postImageLink = el
          .find("a")
          .find($(".item-list-img"))
          .attr("data-bc")
          .replace("url(", "")
          .replace(")", "");

        //finding post title (make to array for becoming easier in search)
        const postTitle = el
          .find($(".item-list-text"))
          .find("h2")
          .find("a")
          .text();

        const postLink = el.find("a").attr("href");

        const author = el
          .find($(".item-list-text"))
          .find(".ListItemHeader")
          .find(".authorlist")
          .text();

        const dataOfPublish = el
          .find($(".item-list-text"))
          .find(".ListItemHeader")
          .find(".datelist")
          .text();

        let commentsCount;
        const listItemHeaders = el
          .find(".item-list-text")
          .find(".ListItemHeader")
          .find("span");
        const listItemLength = listItemHeaders.length;
        listItemHeaders.each((_index, _el) => {
          if (_index === listItemLength - 1) {
            commentsCount = $(_el).html().split(" ")[0];
            // console.log(commentsCount);
          }
        });

        // console.log(commentsCount);

        const summeryDescription = el
          .find($(".item-list-text"))
          .find("p")
          .text();
        // console.log(postImageLink);

        const categories = [];
        el.find(".item-list-text")
          .find(".ListItemHeader")
          .find(".catlist")
          .each((_index, _el) => {
            const catg = $(_el).find("a").text();
            if (catg !== "رپورتاژ آگهی") {
              // console.log(catg);
              categories.push(catg);
            }
          });

        if (categories.length > 0) {
          const postInfo = {
            kind: "medium",
            postTitle: postTitle,
            postLink: postLink,
            author: author,
            postImage: postImageLink,
            postImageAlt: postTitle,
            date: dataOfPublish,
            summeryDescription: summeryDescription ? summeryDescription : " ",
            commentsCount: commentsCount === "+" ? 0 : +commentsCount,
            categories: categories,
          };
          jsonData.push(postInfo);
        }
      } else {
        const el = $(contentList);
        // for non-featured post -->
        //finding image link
        const smallPostImageLink = el
          .find($(".item-list-img"))
          .find("img")
          .attr("data-src");
        // console.log(smallPostImageLink);

        //image alt attribute
        const smallPostAlt = el
          .find($(".item-list-img"))
          .find("img")
          .attr("alt");

        //finding post title (make to array for becoming easier in search)
        const smallPostTitle = el
          .find($(".item-list-text"))
          .find("h3 a")
          .text();
        // console.log(smallPostTitle);

        //finding post link
        const smallPostLink = el.find($(".item-list-img")).find("a").attr("href");
        // console.log(smallPostLink);

        //author name
        const author = el
          .find($(".item-list-text"))
          .find($(".ListItemHeader"))
          .find($(".authorlist a"))
          .text();

        //date
        const dataOfPublish = el
          .find($(".item-list-text"))
          .find($(".ListItemHeader"))
          .find($(".datelist"))
          .text();

        let commentsCount = el
          .find($(".item-list-text"))
          .find($(".ListItemHeader"))
          .find("a span")
          .text().split(" ")[0]

        //summery description
        const summeryDescription = el
          .find($(".item-list-text"))
          .find("p")
          .text();

        const categories = [];
        el
          .find($(".item-list-text"))
          .find($(".catgroup"))
          .find("ul")
          .each((_index, _el) => {
            $(_el)
              .find($(".catitem"))
              .each((_index_, _el_) => {
                const catgItem = $(_el_).find("a").text();
                if (catgItem !== "رپورتاژ آگهی") {
                  // console.log(catgItem);
                  categories.push(catgItem);
                }
              });
          });

        //gathering info
        if (categories.length > 0) {
          // console.log(categories);
          // console.log(typeof categories);
          const postInfo = {
            kind: "small",
            postTitle: smallPostTitle,
            postLink: smallPostLink,
            author: author,
            postImage: smallPostImageLink,
            postImageAlt: smallPostAlt,
            date: dataOfPublish,
            summeryDescription: summeryDescription ? summeryDescription : " ",
            commentsCount: commentsCount === "+" ? 0 : +commentsCount,
            categories: categories,
          };
          jsonData.push(postInfo);
        }
      }
    });
    // console.log(jsonData);
    // fs.createWriteStream(path.join(__dirname, "..", "zoomit-all.json")).write(
    //   JSON.stringify(jsonData)
    // );

    // requestShouldContinue = false;
    if (jsonData.length > 0) {
      // console.log("jsonData",jsonData)
      return jsonData;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

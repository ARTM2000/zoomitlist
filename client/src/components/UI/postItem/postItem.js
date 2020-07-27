import React from "react";

import StyleSheet from "./postItem.module.css";
import Image from "../imagePlaceHolder/imagePlaceHolder";

const postItem = (props) => {
  if (!props.post.postLink) {
    return (
      <div
        className={StyleSheet.Main}
        style={{ backgroundColor: props.darkMode ? "#444444" : "#f8f8f8" }}
      >
        <div className={StyleSheet.PreLoad_ImgContainer}></div>
        <div className={StyleSheet.Content}></div>
      </div>
    );
  }
  const postLink =
    props.post.postLink.slice(0, props.post.postLink.length - 2)

  let postImage = props.post.postImage;
  if (props.post.kind === "medium") {
    postImage = postImage.replace("680x300", "400x267");
  }
  if (window.innerWidth <= 600) {
    postImage = postImage.replace("400x267", "110x110");
  }

  let title = props.post.postTitle.trim();
  if (window.innerWidth <= 340 && title.length > 40) {
    title = title.slice(0, 40).trim() + "...";
  } else if (title.length > 55 && window.innerWidth <= 740) {
    title = title.slice(0, 55).trim() + "...";
  } else {
    // there is some issue when english words exist in title at length of 73
    title = title.slice(0, 75).trim() + (title.length > 75 ? "..." : "");
  }

  const comment = props.post.commentsCount
    ? props.post.commentsCount + " دیدگاه"
    : "نظرت چیه؟";

  let description = props.post.summeryDescription.trim();

  window.addEventListener("resize", () => {

    if (window.innerWidth <= 600) {
      postImage = postImage.replace("400x267", "110x110");
    }

    if (description.length > 80 && window.innerWidth <= 760) {
      description = description.slice(0, 80).trim() + "...";
    } else {
      description =
        description.slice(0, 110).trim() +
        (description.length > 110 ? "..." : "");
    }
  })

  if (description.length > 80 && window.innerWidth <= 760) {
    description = description.slice(0, 80).trim() + "...";
  } else {
    description = description.slice(0, 110).trim() + (description.length > 110 ? "..." : "")
  }

  const mainStyle = props.darkMode ? [StyleSheet.Main, StyleSheet.Dark].join(" ") : StyleSheet.Main;

  return (
    <div
      className={mainStyle}
      style={{ backgroundColor: props.darkMode ? "#444444" : "#f8f8f8" }}
    >
      <div className={StyleSheet.ImgContainer}>
        <a
          href={postLink}
          target="blank"
          rel="follow"
          title={props.post.postTitle.trim()}
        >
          <Image
            ImageSrc={postImage}
            ImageAlt={props.post.postImageAlt}
            BRadios="0px 10px 10px 0px"
          />
        </a>
      </div>
      <div className={StyleSheet.Content}>
        <a
          href={postLink}
          target="blank"
          rel="follow"
          title={props.post.postTitle.trim()}
        >
          <h3
            className={StyleSheet.Title}
            style={{ color: props.darkMode ? "white" : "black" }}
          >
            {title}
          </h3>
        </a>
        <p className={StyleSheet.Description}>{description}</p>
        <p className={StyleSheet.AdditionalInfo}>
          {props.post.author} | {props.post.date} | {comment}
        </p>
      </div>
    </div>
  );
};

export default postItem;

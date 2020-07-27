import React from "react";

import StyleSheet from "./mPost.module.css";
import PostSlideController from "./slideController/slideController";
import Image from "../../../UI/imagePlaceHolder/imagePlaceHolder";

const mPost = (props) => {
  if (!props.post) {
    return (
      <>
        <div
          className={props.darkMode ? StyleSheet.Post_Dark : StyleSheet.Post}
        >
          <div className={StyleSheet.PreLoad_ImgContainer}></div>
        </div>
        <div className={StyleSheet.PreLoad_ControlContainer}></div>
      </>
    );
  }
  let comment = props.post.commentsCount
    ? `${props.post.commentsCount} دیدگاه`
    : "نظرت چیه؟";

  let postLink =
    props.post.postLink.slice(0, props.post.postLink.length - 2)

  let title = props.post.postTitle.trim();
  let description = props.post.summeryDescription.trim();

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1150 && title.length > 50) {
      title = title.slice(0, 50).trim() + "...";
    } else if (title.length > 68) {
      title = title.slice(0, 68).trim() + "...";
    }

    if (window.innerWidth <= 1100 && description.length > 120) {
      description = description.slice(0, 120).trim() + "...";
    } else {
      description =
        description.slice(0, 160) + (description.length > 160 ? "..." : "");
    }
  })

  if (window.innerWidth <= 1150 && title.length > 50) {
    title = title.slice(0, 50).trim() + "...";
  } else if (title.length > 68) {
    title = title.slice(0, 68).trim() + "...";
  }

  if (window.innerWidth <= 1100 && description.length > 120) {
    description = description.slice(0, 120).trim() + "..."
  } else {
    description = description.slice(0, 160) + (description.length > 160 ? "..." : "");
  }

  return (
    <>
      <div className={props.darkMode ? StyleSheet.Post_Dark : StyleSheet.Post}>
        <div className={StyleSheet.ImgContainer}>
          <a href={postLink} target="blank">
            <Image
              ImageSrc={props.post.postImage}
              ImageAlt={props.post.postImageAlt}
              BRadios="10px 10px 0 0"
            />
          </a>
        </div>
        <div className={StyleSheet.Content}>
          <a href={postLink} target="blank">
            <h1 className={StyleSheet.PostTitle}>{title}</h1>
          </a>
          <p className={StyleSheet.Description}>{description}</p>
          <p className={StyleSheet.AdditionalInfo}>
            {props.post.author} | {props.post.date} | {comment}
          </p>
        </div>
        <div className={StyleSheet.ControlContainer}>
          <PostSlideController
            postsCount={props.postsCount}
            showPost={props.showPost}
            currentIndex={props.currentIndex}
          />
        </div>
      </div>
    </>
  );
};

export default mPost;

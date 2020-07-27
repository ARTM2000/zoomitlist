import React from "react";

import StyleSheet from "./sPost.module.css";

const sPost = (props) => {
  let MainStyle = [
    props.darkMode ? StyleSheet.Main_Dark : StyleSheet.Main,
    props.index < 3 ? "" : StyleSheet.SThree,
  ];

  if (!props.post.postLink) {
    return (
      <div className={MainStyle.join(" ")}>
        <div className={StyleSheet.PreLoad_ImgContainer}></div>
        <div className={StyleSheet.Content}></div>
      </div>
    );
  }
  const postLink =
    props.post.postLink.slice(0, props.post.postLink.length - 2)

  let postImage = props.post.postImage;
  if (window.innerWidth <= 705) {
    postImage = postImage.replace("400x267", "110x110");
  } else {
    postImage = postImage.replace("400x267", "400x384");
  }

  const comment = props.post.commentsCount
    ? props.post.commentsCount + " دیدگاه"
    : "نظرت چیه؟";

  let title = props.post.postTitle.trim();

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1100 && title.length > 60) {
      title = title.slice(0, 60).trim() + "...";
    } else if (title.length > 80) {
      title = title.slice(0, 80).trim() + "...";
    }
  })

  if (window.innerWidth <= 1100 && title.length > 60) {
    title = title.slice(0, 60).trim() + "...";
  } else if (title.length > 80) {
    title = title.slice(0, 80).trim() + "...";
  }

  return (
    <div className={MainStyle.join(" ")}>
      <div
        className={[
          StyleSheet.ImgContainer,
          StyleSheet.PreLoad_ImgContainer,
        ].join(" ")}
      >
        <a href={postLink} target="blank" title={props.post.postTitle}>
          <img src={postImage} alt={props.post.postImageAlt} />
        </a>
      </div>
      <div className={StyleSheet.Content}>
        <a href={postLink} target="blank" title={props.post.postTitle}>
          <h2 className={StyleSheet.Title}>{title}</h2>
        </a>
        <p className={StyleSheet.AdditionalInfo}>
          {props.post.author.trim()} | {props.post.date.trim()} | {comment}
        </p>
      </div>
    </div>
  );
};

export default sPost;

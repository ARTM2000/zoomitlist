import React from "react";

import StyleSheet from "./slideController.module.css";

const postSlideNavigation = (props) => {
  const slideCount = props.postsCount;
  const slideCircle = [];
  for(let i = 0; i < slideCount; i++) {
      slideCircle.push(" ");
  }
  const circles = slideCircle.map((el, index) => (
    <div
      key={index}
      className={
        props.currentIndex === index
          ? StyleSheet.SlideCircle_Active
          : StyleSheet.SlideCircle
      }
      onClick={() => props.showPost(index)}
    ></div>
  ));

  return <div className={StyleSheet.Main}>{circles}</div>
};

export default postSlideNavigation;

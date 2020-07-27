import React from "react";

import StyleSheet from "./hotPostMItem.module.css";
import PostItem from "./mPost/mPost";

const hotPostMItem = (props) => {
  let post = props.post;

  return (
    <div className={StyleSheet.Main}>
      <PostItem
        post={post}
        darkMode={props.darkMode}
        showPost={props.showPost}
        postsCount={props.postsCount}
        currentIndex={props.currentPostIndex}
      />
    </div>
  );
};

export default hotPostMItem;

import React from "react";

import StyleSheet from "./hotPosts.module.css";
import MediumPost from "./hotPostMItem/hotPostMItem";
import SmallPost from "./hotPostSItem/hotPostSItem";

const hotPosts = (props) => {

  return (
    <div className={StyleSheet.Main}>
      <MediumPost
        showPost={props.onShowMediumFunction}
        postsCount={props.mediumPostsCount}
        post={props.mediumPosts}
        darkMode={props.darkMode}
        currentPostIndex={props.currentMediumPostIndex}
      />
      <SmallPost posts={props.smallPosts} darkMode={props.darkMode} />
    </div>
  );
}

export default hotPosts;

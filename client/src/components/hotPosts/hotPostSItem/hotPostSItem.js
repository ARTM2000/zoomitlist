import React from "react";

import StyleSheet from "./hotPostSItem.module.css";
import SmallPostItem from "./sPost/sPost";

const hotPostSItem = (props) => (
  <div className={StyleSheet.Main}>
    {props.posts.map((el, index) => (
      <SmallPostItem
        key={index}
        post={el}
        index={index}
        darkMode={props.darkMode}
      />
    ))}
  </div>
);

export default hotPostSItem;

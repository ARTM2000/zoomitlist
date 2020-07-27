import React from "react";

import StyleSheet from "./selectedItem.module.css";

const selectedItem = (props) => (
  <div
    className={StyleSheet.Main}
    onClick={props.removeFromSelected}
    style={{ color: props.darkMode ? "white" : "black" }}
  >
    <span className={StyleSheet.Del}><span className={StyleSheet.Min}></span></span>
    <span className={StyleSheet.CatgName}>{props.name}</span>
  </div>
);

export default selectedItem;
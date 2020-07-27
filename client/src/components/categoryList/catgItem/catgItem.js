import React from "react";

import StyleSheet from "./catgItem.module.css";

const catgItem = (props) =>
  !props.loading ? (
    <div className={StyleSheet.Main} onClick={props.addToSelected}>
      <span className={StyleSheet.CatgName}>{props.name}</span>
      <span className={StyleSheet.Count}>
        {" - "}
        {props.count}
      </span>
    </div>
  ) : (
    <div className={StyleSheet.Main_Loading}></div>
  );

export default catgItem;

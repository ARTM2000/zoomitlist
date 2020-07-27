import React from "react";

import StyleSheet from "./searchCatgs.module.css";
import Main from "../UI/mainDiv/mainDiv";

const searchCatgs = (props) => {
  return (
    <Main style={{ direction: "rtl", position: "relative" }}>
      <div
        className={StyleSheet.InputContainer}
        style={{
          borderBottom: `2px solid ${props.darkMode ? "#979797" : "#6e6e6e"}`,
          color: props.darkMode ? "white" : "black",
        }}
      >
        <label>
          <input
            type="text"
            className={StyleSheet.SearchInput}
            placeholder="جستجو دسته بندی..."
            value={props.query}
            onChange={props.getQueryFunction}
            autoFocus
            style={{
              color: props.darkMode ? "white" : "black",
            }}
          />
          {props.query.length > 0 ? (
            <div className={StyleSheet.Clear} onClick={props.onBlurFunction}>
              <span className={StyleSheet.Cross1}></span>
              <span className={StyleSheet.Cross2}></span>
            </div>
          ) : null}
        </label>
        {props.resultArray.length > 0 ? (
          <div
            className={StyleSheet.Result}
            style={{ backgroundColor: props.darkMode ? "#444444" : "white" }}
          >
            {props.resultArray.map((el, index) => (
              <div
                className={
                  props.darkMode
                    ? StyleSheet.CatgItem_Dark
                    : StyleSheet.CatgItem_Light
                }
                key={index}
                onClick={() => props.addCatgsFunction(index)}
              >
                <span>{el.name} - </span>
                <span>{el.count}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Main>
  );
};

export default searchCatgs;

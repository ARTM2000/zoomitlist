import React from "react";

import StyleSheet from "./searchPageHead.module.css";
import Main from "../UI/mainDiv/mainDiv";

const searchPageHead = (props) => {
  let count;

  if (!props.showCount) {
    count = null;
  }
  if (!props.haveContent) {
    count =
      "نتیجه ای یافت نشد؛";
  }
  if (props.haveContent && props.showCount) {
    count = ` ${props.countOfContent} مطلب یافت شد`;
  }

  const researching = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      props.onResearch();
    }
  };

  return (
    <Main style={{ direction: "rtl" }}>
      <div
        className={StyleSheet.Container}
        style={{ borderColor: props.darkMode ? "white" : "black" }}
      >
        <div className={StyleSheet.Content}>
          <label>
            <input
            type="text"
            placeholder={props.lastQuery ? decodeURI(props.lastQuery) : "جستجو..."}
            style={{ color: props.darkMode ? "white" : "black" }}
            onChange={props.onSetResearchValue}
            onKeyDown={researching}
            value={props.searchQuery}
            autoFocus
          />
          {props.searchQuery !== "" && props.searchQuery ? (
            <div className={StyleSheet.Clear} onClick={() => props.onSetResearchValue({target: { value: ""}})}>
              <span className={StyleSheet.Cross1}></span>
              <span className={StyleSheet.Cross2}></span>
            </div>
          ) : null}
          </label>
        </div>
        <p
          className={StyleSheet.Count}
          style={{ color: props.darkMode ? "white" : "black" }}
        >
          {props.lastQuery ? count : null}
        </p>
        {!props.haveContent && props.lastQuery ? (
          <p
            className={StyleSheet.Count}
            style={{ color: props.darkMode ? "white" : "black" }}
          >
            پیشنهاد می شود که از کلمات هم معنی، مشابه یا اگر کلمه لاتین است از
            نوشتار اصلی آن یا بلعکس استفاده کنید.
          </p>
        ) : null}
      </div>
    </Main>
  );
};

export default searchPageHead;

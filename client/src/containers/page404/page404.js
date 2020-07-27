import React from "react";
import { Link } from "react-router-dom";

import StyleSheet from "./page404.module.css";
import Main from "../../components/UI/mainDiv/mainDiv";

const page404 = (props) => {
  window.scrollTo(0, 0);
  return (
    <Main style={{ direction: "rtl" }}>
      <div
        className={StyleSheet.Holder}
        style={{ color: props.darkMode ? "white" : "black" }}
      >
        <div className={StyleSheet.HeadHolder}>
          <span
            className={StyleSheet.FFour}
            style={{ color: props.darkMode ? "white" : "black" }}
          >
            4
          </span>
          <span
            className={StyleSheet.SFour}
            style={{ color: props.darkMode ? "white" : "black" }}
          >
            4
          </span>
          <div className={StyleSheet.AnimeHolder}>
            <div className={StyleSheet.BMoving}>
              <div className={StyleSheet.SMoving}>
                <span className={StyleSheet.Circle}></span>
                <span className={StyleSheet.Base}></span>
              </div>
            </div>
          </div>
        </div>
        <div className={StyleSheet.Instructor}>
          <h1 className={StyleSheet.PageTitle}>
            آدرسی که دنبالش هستید پیدا نشد
          </h1>
          <Link to="/" className={StyleSheet.NavigateLink}>
            <strong>موارد دیگری را امتحان کنید</strong>
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default page404;

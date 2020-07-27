import React from "react";

import Main from "../../UI/mainDiv/mainDiv";
import StyleSheet from "./description.module.css";
import LinkedIn from "../../../assets/images/linkedin.png";
import Telegram from "../../../assets/images/telegram.png";
import Gmail from "../../../assets/images/gmail.png";

const description = (props) => (
  <Main>
    <div
      className={StyleSheet.Container}
      style={{ color: props.darkMode ? "white" : "black" }}
    >
      <h1>
        به <span style={{ color: "#e50000" }}>زومیت لیست</span> خوش آمدید.
      </h1>
      <p>
        این سایت به جهت لیست کردن آخرین مطالب سایت{" "}
        <a
          href="https://zoomit.ir"
          target="blank"
          style={{ color: props.darkMode ? "white" : "black" }}
        >
          zoomit.ir
        </a>{" "}
        برای ارائه <i>فضای کاربری متفاوت</i> به وسیله{" "}
        <strong>علیرضا تنومندیان</strong> طراحی و کد نویسی شده است.
      </p>
      <p>
        لازم به ذکر است که تمام ارزش معنوی مطالب و پست های این سایت متعلق به
        سایت
        <strong> زومیت</strong> می باشد.
      </p>
      <hr />
      <p>راه های ارتباطی</p>
      <div className={StyleSheet.SocialMedia}>
        <a href="mailto:alirezatanoomandian@gmail.com">
          <img src={Gmail} alt="gmail" />
        </a>
        <a href="https://www.linkedin.com/in/alirezatanoomandian" target="blank">
          <img src={LinkedIn} alt="linkedin" />
        </a>
        <a href="https://t.me/alireza_tanoomandian" target="blank">
          <img src={Telegram} alt="telegram" />
        </a>
      </div>
    </div>
  </Main>
);

export default description;

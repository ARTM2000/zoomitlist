import React from "react";

import StyleSheet from "./catgsContentHead.module.css";
import SelectedCatgsItem from "../selectedCatgs/selectedCatg/selectedItem";
import Button from "../UI/button/button";
import Main from "../UI/mainDiv/mainDiv";

const catgsContentHead = (props) => (
  <>
    <Main style={{ minHeight: "50px" }}>
      <div className={StyleSheet.Container}>
        <Button mode="lowImp" clickFunction={props.backFunction}>
          بازگشت
        </Button>
        {/* <Button mode="lowImp" clickFunction={props.onShowSearch}>
          افزودن دسته بندی
        </Button>
        <br /> */}
        <br />
        {props.selectedCatgs.map((el, index) => (
          <SelectedCatgsItem
            name={el.name}
            darkMode={props.darkMode}
            removeFromSelected={() => props.removeFunction(index)}
          />
        ))}
      </div>
    </Main>
    {/* {props.shouldShowSearch ? (
      <>
        <div
          className={StyleSheet.AddNewCatgBackDrop}
          onClick={props.onBlurSearch}
        ></div>
        <div className={StyleSheet.AddNewCatg}>
          <div
            className={StyleSheet.Holder}
            style={{ backgroundColor: props.darkMode ? "#292828" : "#f3f3f3" }}
          >
            <label>
              <div
                className={StyleSheet.InputContainer}
                style={{
                  borderBottom: `2px solid ${
                    props.darkMode ? "#979797" : "#6e6e6e"
                  }`,
                  color: props.darkMode ? "white" : "black",
                }}
              >
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
                  <div
                    className={StyleSheet.Clear}
                    onClick={props.onBlurFunction}
                  >
                    <span className={StyleSheet.Cross1}></span>
                    <span className={StyleSheet.Cross2}></span>
                  </div>
                ) : null}
              </div>
            </label>
            {props.resultArray.length > 0 ? (
              <div
                className={StyleSheet.Result}
                style={{
                  backgroundColor: props.darkMode ? "#444444" : "white",
                }}
              >
                {props.resultArray.map((el, index) => (
                  <div
                    className={
                      props.darkMode
                        ? StyleSheet.CatgItem_Dark
                        : StyleSheet.CatgItem_Light
                    }
                    key={index}
                    onClick={() => {
                      props.addCatgsFunction(index);
                      props.getContentFunction();
                    }}
                  >
                    <span>{el.name} - </span>
                    <span>{el.count}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </>
    ) : null} */}
  </>
);

export default catgsContentHead;

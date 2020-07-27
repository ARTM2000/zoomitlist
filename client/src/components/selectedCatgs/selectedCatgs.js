import React from "react";

import StyleSheet from "./selectedCatgs.module.css";
import SelectedItems from "./selectedCatg/selectedItem";
import Button from "../UI/button/button";
import Main from "../UI/mainDiv/mainDiv";

const selectedCatgs = (props) => (
  <>
    <Main style={{ minHeight: "120px", direction: "rtl" }}>
      <div className={StyleSheet.Heading}>
        <h2 style={{ color: props.darkMode ? "white" : "black" }}>
          دسته بندی های انتخاب شده
        </h2>
        {props.selectedCatgs.length > 0 ? (
          <div className={StyleSheet.BtnContainer}>
            <Button
              clickFunction={() => {
                props.onFindingContentFunction();
                // console.log("l 18");
              }}
              mode="normal"
            >
              مشاهده
            </Button>
          </div>
        ) : null}
      </div>
      {props.selectedCatgs.length === 0 ? (
        <p style={{ color: props.darkMode ? "#979797" : "black" }}>
          دسته بندی (ها) مورد نظر خود را انتخاب کنید
        </p>
      ) : null}
      {props.selectedCatgs.map((el, index) => (
        <SelectedItems
          key={index}
          darkMode={props.darkMode}
          name={el.name}
          removeFromSelected={() => props.removeSelectedFunction(index)}
        />
      ))}
    </Main>
  </>
);

export default selectedCatgs;

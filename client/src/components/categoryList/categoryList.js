import React from "react";

import StyleSheet from "./categoryList.module.css";
import CatgItem from "./catgItem/catgItem";
import Main from "../UI/mainDiv/mainDiv";

const categoryList = (props) => {
  window.addEventListener("resize", props.forceRender);

  return (
    <Main style={{ direction: "rtl" }}>
      <h2
        className={StyleSheet.Title}
        style={{ color: props.darkMode ? "white" : "black" }}
      >
        پرمحتواترین دسته بندی ها
      </h2>
      {props.categories.length > 0 || props.selectedCategories.length > 0 ? (
        props.categories.map((el, index) => (
          <CatgItem
            key={index}
            name={el.name}
            count={el.count}
            darkMode={props.darkMode}
            addToSelected={() => props.onSelectCatgFunction(index)}
          />
        ))
      ) : (
        <>
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
          <CatgItem loading />
        </>
      )}
    </Main>
  );
};

export default categoryList;

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import StyleSheet from "./latestPost.module.css";
import PostItem from "../UI/postItem/postItem";
import Main from "../UI/mainDiv/mainDiv";

const latestPost = (props) => {
  return (
    <Main style={{ direction: "rtl", alignItems: "center", minHeight: "50vh" }}>
      <div
        className={StyleSheet.SeparatorLine}
        style={{ maxWidth: "1350px", width: "auto", margin: "0 auto" }}
      >
        <hr />
      </div>
      {/* <p className={StyleSheet.Title} style={{color: props.darkMode ? "white" : "black"}}>آخرین مطالب</p> */}
      <div className={StyleSheet.PostContainer}>
        <InfiniteScroll
          dataLength={props.posts.length}
          hasMore={props.hasMore}
          next={() => props.loadMore(props.page)}
          loader={
            <>
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
            </>
          }
        >
          {props.posts.map((el, index) => {
            return (
              <PostItem
                key={index}
                post={el}
                darkMode={props.darkMode}
                isLast={index === props.posts.length - 1}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </Main>
  );
}

export default latestPost;

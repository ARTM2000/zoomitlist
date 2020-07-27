import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostItem from "../../components/UI/postItem/postItem";
// import StyleSheet from "./showHotPosts.module.css";
import Main from "../UI/mainDiv/mainDiv";

const showHotPosts = (props) => {
  return (
    <Main>
      <InfiniteScroll
        dataLength={props.hotPosts.length}
        next={() => {
          props.loadMore(props.page);
          console.log("l 12");
        }}
        loader={
          props.page === 1 ? (
            <>
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
            </>
          ) : (
            <>
              <PostItem post={{}} darkMode={props.darkMode} isLast={true} />
            </>
          )
        }
        hasMore={props.hotPosts.length < props.postsCount}
      >
        {props.hotPosts.map((el, index) => (
          <PostItem
            key={index}
            post={el}
            darkMode={props.darkMode}
            isLast={index === props.hotPosts.length - 1}
          />
        ))}
      </InfiniteScroll>
    </Main>
  );
};

export default showHotPosts;

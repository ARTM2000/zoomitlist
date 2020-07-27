import React, { Component } from "react";
import axios from "axios";

import HotPosts from "../../components/hotPosts/hotPosts";
import LatestPost from "../../components/latestPost/latestPost";

class MainPage extends Component {
  state = {
    requestedPages: [],
    smallHotPosts: [{}, {}, {}, {}, {}, {}],
    mediumHotPosts: [],
    mediumHotPostIndex: 0,
    latestPost: [],
    hasMore: true,
    page: 1,
  };

  componentDidMount() {
    // console.log("on getting posts");
    window.scrollTo(0, 0);
    this.onGetHotMPosts();
    this.onGetHotSPosts();
    this.onGetLatestPosts(this.state.page);
    if (
      this.state.mediumHotPosts !== [] &&
      this.state.smallHotPosts !== [] &&
      this.state.latestPost !== []
    ) {
      this.onShowMediumHotPost();
    }
  }

  onGetHotMPosts = () => {
    axios
      .get("https://zoomitlist.herokuapp.com/a/medium-hot")
      .then((res) => res.data)
      .then((content) => {
        if (content.length > 0) {
          this.setState({ mediumHotPosts: content });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onGetHotSPosts = () => {
    axios
      .get("https://zoomitlist.herokuapp.com/a/small-hot")
      .then((res) => res.data)
      .then((content) => {
        if (content.length > 0) {
          this.setState({ smallHotPosts: content });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onGetLatestPosts = (page) => {
    let lastPosts = [...this.state.requestedPages];
    const wasThere = lastPosts.find((el) => el === page);

    if (!wasThere) {
      lastPosts.push(page);
      this.setState({ requestedPages: lastPosts });
    }

    if (!wasThere) {
      axios
        .get(`https://zoomitlist.herokuapp.com/a/new-posts?page=${page}`)
        .then((res) => {
          return res.data;
        })
        .then((content) => {
          this.setState({ hasMore: content.hasMore });
          if (content.posts.length > 0) {
            this.setState({
              latestPost: this.state.latestPost.concat(content.posts),
            });
          }
        })
        .then(() =>
          this.setState((prevState) => ({ page: prevState.page + 1 }))
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onShowMediumHotPost = (index) => {
    if (index >= 0 && index < this.state.mediumHotPosts.length) {
      this.setState({ mediumHotPostIndex: index });
    } else {
      const interval = setInterval(() => {
        this.setState((prevState) => ({
          mediumHotPostIndex:
            prevState.mediumHotPostIndex < prevState.mediumHotPosts.length - 1
              ? prevState.mediumHotPostIndex + 1
              : 0,
        }));
      }, 14000);
      return () => clearInterval(interval);
    }
  };

  render() {
    let mediumPost;
    mediumPost = this.state.mediumHotPostIndex
      ? this.state.mediumHotPosts[this.state.mediumHotPostIndex]
      : this.state.mediumHotPosts[0];

    return (
      <>
        <HotPosts
          onShowMediumFunction={this.onShowMediumHotPost}
          darkMode={this.props.darkMode}
          smallPosts={this.state.smallHotPosts}
          mediumPosts={mediumPost}
          mediumPostsCount={this.state.mediumHotPosts.length}
          currentMediumPostIndex={this.state.mediumHotPostIndex}
        />
        <LatestPost
          darkMode={this.props.darkMode}
          posts={this.state.latestPost}
          hasMore={this.state.hasMore}
          loadMore={this.onGetLatestPosts}
          page={this.state.page}
        />
      </>
    );
  }
}

export default MainPage;

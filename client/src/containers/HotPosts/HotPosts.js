import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import ShowHotPosts from "../../components/showHotPosts/showHotPosts";

class HotPosts extends Component {
  state = {
    postsCount: 1000,
    hotPosts: [],
    page: 1,
    loadedPages: [],
    cancelRequest: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.onGetHotPosts(this.state.page);
  }

  onGetHotPosts = (page) => {
    const lastPages = [...this.state.loadedPages];
    // console.log(this.state.loadedPages)
    const wasLoad = lastPages.find((el) => el === page);
    if(!wasLoad) {
      lastPages.push(page);
      this.setState({ loadedPages: lastPages });
    }
    let cancelFunc;

    const setCancelFunc = (c) => {
      this.setState({cancelRequest: c});
    }

    if (!wasLoad) {
      axios
        .get(
          `https://zoomitlist.herokuapp.com/a/hot-posts?limit=${this.state.postsCount}&page=${page}`,
          {
            cancelToken: new axios.CancelToken(function exe(c) {
              setCancelFunc(c);
            }),
          }
        )
        .then((res) => {
          this.setState({ cancelRequest: cancelFunc });

          return res.data;
        })
        .then((posts) => {
          const prevPosts = [...this.state.hotPosts];
          this.setState({ hotPosts: prevPosts.concat(posts) });
          console.log("Got new Posts");
        })
        .then(() => {
          this.setState((prevState) => ({ page: prevState.page + 1 }));
          lastPages.push(page);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <>
        <ShowHotPosts
          hotPosts={this.state.hotPosts}
          loadMore={this.onGetHotPosts}
          postsCount={this.state.postsCount}
          darkMode={this.props.darkMode}
          page={this.state.page}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  darkMode: state.darkMode
})

export default connect(mapStateToProps)(HotPosts);

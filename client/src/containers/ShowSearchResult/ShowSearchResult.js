import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import ShowHotPosts from "../../components/showHotPosts/showHotPosts";
import SearchHead from "../../components/searchPageHead/searchPageHead";

class ShowSearchResult extends Component {
  state = {
    searchQuery: "",
    changeableQuery: "",
    foundContent: [],
    count: 1,
    page: 1,
    loadedPage: [],
    haveContent: true,
    onResearchValue: "",
    cancelToken: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.state.cancelToken && this.state.cancelToken();
    const searchQ = this.props.location.search.split("=")[1];
    this.setState(
      {
        searchQuery: searchQ,
        changeableQuery: searchQ ? decodeURI(searchQ) : "",
      },
      () => this.getContentBySearch(this.state.page, this.state.searchQuery)
    );
  }

  componentDidUpdate(prevProps) {
    const searchQ = this.props.location.search.split("=")[1];

    if (prevProps.location.search.split("=")[1] !== searchQ) {
      this.getContentBySearch(1, searchQ);
      // console.log("did up");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.search.split("=")[1] !== prevState.searchQuery) {
      // if(prevState.cancelToken) {
      //   prevState.cancelToken();
      // }
      prevState.cancelToken && prevState.cancelToken();
      // console.log("on changing");
      const searchQ = nextProps.location.search.split("=")[1];
      return {
        searchQuery: searchQ,
        changeableQuery: searchQ ? decodeURI(searchQ) : "",
        page: 1,
        foundContent: [],
        count: 1,
        haveContent: true,
        loadedPage: [],
      };
    }
    return null;
  }

  getContentBySearch = (page, query = this.state.searchQuery) => {
    const lastPage = [...this.state.loadedPage];
    // const exp = lastPage.push(page)
    // console.log("exp ", exp, typeof exp)
    const wasThere = lastPage.find((el) => el === page);

    if (query) {
      let searchQuery = query.trim();
      if (!wasThere) {
        lastPage[lastPage.length] = page;
        this.setState({ loadedPage: lastPage });
        const setCancelToken = (c) => this.setState({ cancelToken: c });
        axios
          .get(
            `https://zoomitlist.herokuapp.com/s/content?search=${searchQuery}&page=${page}`,
            {
              cancelToken: new axios.CancelToken((c) => setCancelToken(c)),
            }
          )
          .then((res) => res.data)
          .then((data) => {
            if (!data.status) {
              // console.log("no error from server");
              if (data.count) {
                this.setState({ count: data.count });
              }
              if (data.count === 0) this.setState({ haveContent: false });
              const prevContent = [...this.state.foundContent];
              this.setState({
                foundContent: prevContent.concat(data.content),
              });
              // console.log("content found");
              // console.log(data.content);
              return data.count;
            } else return false;
          })
          .then((count) => {
            if (count && this.state.foundContent.length < this.state.count) {
              this.setState((prevState) => ({ page: prevState.page + 1 }));
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      this.setState({haveContent: false})
    }
  };

  onGetResearchValue = (e) =>
    this.setState({ changeableQuery: e.target.value });

  onResearchingOnSearchPage = () => {
    const newQuery = this.state.changeableQuery.trim();
    if (newQuery !== "") {
      this.props.history.push(`/search?q=${newQuery}`);
    }
  };

  render() {
    return (
      <>
        <SearchHead
          onSetResearchValue={this.onGetResearchValue}
          onResearch={this.onResearchingOnSearchPage}
          searchQuery={this.state.changeableQuery}
          lastQuery={this.state.searchQuery}
          countOfContent={this.state.count}
          showCount={this.state.foundContent.length > 0}
          haveContent={this.state.haveContent}
          darkMode={this.props.darkMode}
        />
        {this.state.haveContent ? (
          <ShowHotPosts
            hotPosts={this.state.foundContent}
            loadMore={this.getContentBySearch}
            postsCount={this.state.count}
            darkMode={this.props.darkMode}
            page={this.state.page}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  darkMode: state.darkMode
})

export default connect(mapStateToProps)(withRouter(ShowSearchResult));

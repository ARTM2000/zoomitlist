import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/layout/layout";
import MainPage from "./containers/MainPage/MainPage";
import AsyncComp from "./hoc/asyncComponent";
import Page404 from "./containers/page404/page404";
import "./App.css";
// import HotPosts from "./containers/HotPosts/HotPosts";
// import ShowSearchResult from "./containers/ShowSearchResult/ShowSearchResult";
// import Categories from "./containers/CategoriesList/CategoriesList";
// import AboutPage from "./containers/AboutPage/AboutPage";

const AsyncHotPosts = AsyncComp(() => import("./containers/HotPosts/HotPosts"));
const AsyncShowSearchResult = AsyncComp(() =>
  import("./containers/ShowSearchResult/ShowSearchResult")
);
const AsyncCategories = AsyncComp(() =>
  import("./containers/CategoriesList/CategoriesList")
);
const AsyncAboutPage = AsyncComp(() =>
  import("./containers/AboutPage/AboutPage")
);

class App extends Component {
  state = {
    darkModeClick: 0,
    searchMd: false,
    searchClick: 0,
    searchQuery: "",
    showSMenu: false,
    smallMenuAsked: false,
  };

  componentDidMount() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true" && darkMode) {
      // this.setState({ darkMode: true });
      this.props.changeMode(true);
    } else if (darkMode === "false" && darkMode) {
      // this.setState({ darkMode: false });
      this.props.changeMode(false);
    } else {
      // this.setState({ darkMode: false });
      this.props.changeMode(false);
    }
  }

  changeViewMode = () => {
    this.props.changeMode(!this.props.darkMode);
    localStorage.setItem("darkMode", !this.props.darkMode);
    this.setState((prevState) => ({
      darkModeClick: prevState.darkModeClick
        ? prevState.darkModeClick
        : prevState.darkModeClick + 1,
    }));
    // this.setState((prevState) => {
    //   localStorage.setItem("darkMode", !prevState.darkMode);
    //   return {
    //     darkMode: !prevState.darkMode,
    //     darkModeClick: prevState.darkModeClick
    //       ? prevState.darkModeClick
    //       : prevState.darkModeClick + 1,
    //   };
    // });
  };

  onGetSearchQuery = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  onBlurSearchBar = () => {
    // this.setState({ searchMd: false, searchClick: 0, searchQuery: "" });
    this.setState({ searchCK: true, searchMd: false });
    setTimeout(
      () => this.setState({ searchMd: false, searchClick: 0, searchQuery: "" }),
      150
    );
  };

  onClickSearchHandler = () => {
    if (!this.state.searchMd && this.state.searchClick) {
      this.onBlurSearchBar();
    } else {
      this.setState({ searchMd: true });
    }
    this.setState((prevState) => ({
      searchClick: prevState.searchClick
        ? prevState.searchClick
        : prevState.searchClick + 1,
    }));
  };

  onShowSmallMenu = () =>
    this.setState((prevState) => ({ showSMenu: !prevState.showSMenu }));

  onChangeSmallMenuIcon = () => {
    if (!this.state.smallMenuAsked) {
      this.setState({ smallMenuAsked: true });
    }
  };

  render() {
    return (
      <BrowserRouter basename="/">
        <Layout
          changeViewFunction={this.changeViewMode}
          searchFunction={this.onClickSearchHandler}
          cleanSearchQueriesFunction={() =>
            this.setState({ searchQuery: "", searchMd: false })
          }
          getSearchQueryFunction={this.onGetSearchQuery}
          onBlurSearchFunction={this.onBlurSearchBar}
          onShowSMenu={this.onShowSmallMenu}
          onSmallMenuIcon={this.onChangeSmallMenuIcon}
          darkMode={this.props.darkMode}
          searchMd={this.state.searchMd}
          darkModeCK={this.state.darkModeClick}
          searchCK={this.state.searchClick}
          searchQuery={this.state.searchQuery}
          showSMenu={this.state.showSMenu}
          smallMenuMore={this.state.smallMenuAsked}
        >
          <Switch>
            <Route exact path="/search" component={AsyncShowSearchResult} />
            <Route exact path="/hot-posts" component={AsyncHotPosts} />
            <Route exact path="/categories" component={AsyncCategories} />
            <Route exact path="/about" component={AsyncAboutPage} />
            <Route
              exact
              path="/"
              render={() => <MainPage darkMode={this.props.darkMode} />}
            />
            <Route
              path="*"
              render={() => <Page404 darkMode={this.props.darkMode} />}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

const mapDispatchToProps = (dispatch) => ({
  changeMode: (mode) => dispatch({ type: "CHANGE_COLOR_MODE", mode: mode }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

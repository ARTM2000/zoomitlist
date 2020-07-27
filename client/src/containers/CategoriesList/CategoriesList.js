import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import CategoryList from "../../components/categoryList/categoryList";
import SelectedCatgs from "../../components/selectedCatgs/selectedCatgs";
import AdvanceSearch from "../../components/searchCatgs/searchCatgs";
import ShowContent from "../../components/showHotPosts/showHotPosts";
import CatgsContentHead from "../../components/catgsContentHead/catgsContentHead";

class Categories extends Component {
  state = {
    categories: [],
    mostContentCatgs: [],
    mostContentCatgsBackup: [],
    listMode: false,
    searchQuery: "",
    catgsSearchResult: [],
    selectedCategories: [],
    loadedPages: [],
    categoriesContent: [],
    page: 1,
    count: 1,
    cancelToken: null,
    addInContentMode: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.onGetCategories();
  }

  onGetCategories = () => {
    axios
      .get("https://zoomitlist.herokuapp.com/a/categories")
      .then((res) => res.data)
      .then((catgs) => {
        let allCatgs = catgs.categories;
        allCatgs = allCatgs.sort((a, b) => b.count - a.count);
        this.setState({
          categories: allCatgs.map((el, index) => ({ ...el, index: index })),
          mostContentCatgs: allCatgs.slice(0, 18),
          mostContentCatgsBackup: allCatgs.slice(0, 18),
        });
        return allCatgs;
      })
      .catch((err) => console.log(err));
  };

  onSelectCategories = (index) => {
    const category = { ...this.state.categories[index] };
    const isThere = this.state.selectedCategories.findIndex(
      (el) => el.name === category.name
    );
    if (isThere < 0) {
      const lastSelectedCatg = [...this.state.selectedCategories];
      lastSelectedCatg.push(category);

      const updateSearchCatgList = [...this.state.categories].filter(
        (el) => el.name !== category.name
      );
      updateSearchCatgList.sort((a, b) => b.count - a.count);

      this.setState(
        {
          selectedCategories: lastSelectedCatg,
          categories: updateSearchCatgList,
        },
        () => {
          if (this.state.catgsSearchResult !== []) {
            this.onGetCatgSearchQuery(this.state.searchQuery);
          }
        }
      );

      const isMost = [...this.state.mostContentCatgsBackup].find(
        (el) => el.name === category.name
      );
      if (isMost) {
        const mostContentCatgsUpdate = [...this.state.mostContentCatgs].filter(
          (el) => el.name !== category.name
        );
        this.setState({ mostContentCatgs: mostContentCatgsUpdate }, () => {
          if (this.state.catgsSearchResult !== []) {
            this.onGetCatgSearchQuery(this.state.searchQuery);
          }
        });
      }
    }
  };

  onRemoveFromSelectedCatg = (index) => {
    this.setState({ page: 1 });

    const selectedCatg = { ...this.state.selectedCategories[index] };

    //deleting this catg from selected catgs
    const updateSelectedCatgs = [...this.state.selectedCategories].filter(
      (el) => el.name !== selectedCatg.name
    );

    const newCategories = [...this.state.categories];
    newCategories.splice(selectedCatg.index, 0, selectedCatg);
    newCategories.sort((a, b) => b.count - a.count);

    // console.log(newCategories)
    if (updateSelectedCatgs.length === 0) {
      this.state.cancelToken && this.state.cancelToken();
      this.setState({
        categoriesContent: [],
        page: 1,
        loadedPages: [],
        listMode: false,
      });
    }
    if (updateSelectedCatgs.length === 0) {
      if (this.state.cancelToken) {
        this.state.cancelToken();
      }
      this.setState({
        listMode: false,
        categoriesContent: [],
        page: 1,
        loadedPages: [],
      });
    }
    if (this.state.listMode && updateSelectedCatgs.length !== 0) {
      this.state.cancelToken();
      this.setState({ categoriesContent: [], page: 1, loadedPages: [] }, () => {
        // console.log("l 128");
        this.onGetContents();
      });
    }

    this.setState(
      {
        selectedCategories: updateSelectedCatgs,
        categories: newCategories,
      },
      () => {
        if (this.state.catgsSearchResult !== []) {
          this.onGetCatgSearchQuery(this.state.searchQuery);
        }
      }
    );

    const isMost = [...this.state.mostContentCatgsBackup].findIndex(
      (el) => el.name === selectedCatg.name
    );
    if (isMost > -1) {
      const mostContentCatgsUpdate = [...this.state.mostContentCatgs];
      mostContentCatgsUpdate.splice(selectedCatg.index, 0, selectedCatg);
      mostContentCatgsUpdate.sort((a, b) => b.count - a.count);
      this.setState({ mostContentCatgs: mostContentCatgsUpdate }, () => {
        if (this.state.catgsSearchResult !== []) {
          this.onGetCatgSearchQuery(this.state.searchQuery);
        }
      });
    }
  };

  onGetCatgSearchQuery = (e) => {
    let query;

    if (e.target) {
      query = e.target.value;
    } else {
      query = e;
    }

    this.setState({ searchQuery: query });
    const letters = query.split("");
    let shouldSearch = true;
    letters.forEach((el) => {
      if (el === "\\" || el === "/") {
        shouldSearch = shouldSearch && false;
      } else {
        shouldSearch = shouldSearch && true;
      }
    });

    if (query !== "" && shouldSearch) {
      const reg = new RegExp(query, "i");
      const foundSimilarCatgs = [];
      const categories = [...this.state.categories];

      categories.forEach((el, index) => {
        // console.log(el.name, typeof el.name)
        const thereIsSimilar = reg.test(el.name);
        if (thereIsSimilar) {
          foundSimilarCatgs.push(el);
        }
      });
      // console.log(foundSimilarCatgs);
      this.setState({ catgsSearchResult: foundSimilarCatgs });
    } else {
      this.setState({ catgsSearchResult: [] });
    }
  };

  addSelectedCatgsFromSearch = (index) => {
    const search = { ...this.state.catgsSearchResult[index] };
    const correctIndex = [...this.state.categories].findIndex(
      (el) => el.name === search.name
    );
    this.onSelectCategories(correctIndex);
    this.setState({ catgsSearchResult: [], searchQuery: "" });
  };

  onGetContents = (page = this.state.page) => {
    if (this.state.selectedCategories.length > 0) {
      this.setState({ listMode: true });

      // console.log("in fetch contents")
      const lastPages = [...this.state.loadedPages];
      const wasThere = lastPages.findIndex((el) => el === page);

      if (wasThere === -1) {
        lastPages[lastPages.length] = page;
        this.setState({ loadedPages: lastPages }, () => {
          const searchedCatgs = [...this.state.selectedCategories].map(
            (el) => el.name
          );
          const catgsForFetch = searchedCatgs.join("-");

          const setCancelToken = (c) => this.setState({ cancelToken: c });

          axios
            .get(
              `https://zoomitlist.herokuapp.com/s/content-catg?catg=${catgsForFetch}&page=${page}`,
              {
                cancelToken: new axios.CancelToken((c) => setCancelToken(c)),
              }
            )
            .then((res) => res.data)
            .then((data) => {
              // console.log(data)
              if (data.status) {
                throw data;
              }
              if (this.state.count <= data.count) {
                this.setState({ count: data.count });
              }
              this.setState((prevState) => ({
                categoriesContent: prevState.categoriesContent.concat(
                  data.content
                ),
                page: prevState.page + 1,
              }));
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    }
  };

  onBackFunction = () => {
    this.state.cancelToken();
    this.onGetCategories();
    this.setState({
      selectedCategories: [],
      loadedPages: [],
      categoriesContent: [],
      page: 1,
      count: 1,
      listMode: false,
    });
  };

  onSearchInContent = () => {
    document.body.style.overflow = "hidden";
    this.setState({ addInContentMode: true });
  };

  render() {
    return (
      <div>
        {!this.state.listMode ? (
          <>
            <AdvanceSearch
              getQueryFunction={this.onGetCatgSearchQuery}
              addCatgsFunction={this.addSelectedCatgsFromSearch}
              onBlurFunction={() =>
                this.setState({ catgsSearchResult: [], searchQuery: "" })
              }
              darkMode={this.props.darkMode}
              resultArray={this.state.catgsSearchResult}
              query={this.state.searchQuery}
            />
            <SelectedCatgs
              removeSelectedFunction={this.onRemoveFromSelectedCatg}
              onFindingContentFunction={this.onGetContents}
              darkMode={this.props.darkMode}
              selectedCatgs={this.state.selectedCategories}
            />
            <CategoryList
              onSelectCatgFunction={this.onSelectCategories}
              darkMode={this.props.darkMode}
              categories={this.state.mostContentCatgs}
              selectedCategories={this.state.selectedCategories}
            />
          </>
        ) : (
          <>
            <CatgsContentHead
              getQueryFunction={this.onGetCatgSearchQuery}
              addCatgsFunction={this.addSelectedCatgsFromSearch}
              onBlurFunction={() =>
                this.setState({ catgsSearchResult: [], searchQuery: "" })
              }
              backFunction={this.onBackFunction}
              getContentFunction={() => {
                this.state.cancelToken && this.state.cancelToken();
                this.setState(
                  {
                    page: 1,
                    count: 1,
                    loadedPages: [],
                    categoriesContent: [],
                    addInContentMode: false,
                  },
                  () => {
                    document.body.style.overflow = "auto";
                    this.onGetContents();
                  }
                );
              }}
              removeFunction={this.onRemoveFromSelectedCatg}
              onShowSearch={this.onSearchInContent}
              onBlurSearch={() =>
                this.setState(
                  { addInContentMode: false },
                  () => (document.body.style.overflow = "auto")
                )
              }
              darkMode={this.props.darkMode}
              resultArray={this.state.catgsSearchResult}
              query={this.state.searchQuery}
              selectedCatgs={this.state.selectedCategories}
              shouldShowSearch={this.state.addInContentMode}
            />
            <ShowContent
              loadMore={this.onGetContents}
              hotPosts={this.state.categoriesContent}
              postsCount={this.state.count}
              darkMode={this.props.darkMode}
              page={this.state.page}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps)(withRouter(Categories));

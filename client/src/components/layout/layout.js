import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import StyleSheet from "./layout.module.css";
import Logo from "../../assets/images/zoomit_no_ad_comp_1x.png";
import SearchIcon from "../../assets/images/search_icon.png";

const layout = (props) => {
  let searchBarStyle;
  let toggleDarkBtnStyle;

  // console.log(props)
  const onSearchMode = () => {
    // console.log(inputNode)
    // inputNode.current.focus();
    if (!props.searchQuery) {
      props.searchFunction();
    } else {
      props.history.push(`/search?q=${props.searchQuery}`);
      // alert("on search");
      props.cleanSearchQueriesFunction();
    }
  };

  const onSearchModeEnterCode = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && props.searchQuery) {
      props.history.push(`/search?q=${props.searchQuery}`);
      // alert("on search");
      props.cleanSearchQueriesFunction();
    }
  };

  //handling search bar animation
  if (props.searchCK) {
    if (props.searchMd) {
      searchBarStyle = StyleSheet.SearchInput;
    } else {
      searchBarStyle = StyleSheet.SearchInput_Hide;
    }
  } else {
    searchBarStyle = StyleSheet.SearchInput_First;
  }

  //handling toggle button dark/light changer
  if (props.darkModeCK) {
    if (props.darkMode) {
      toggleDarkBtnStyle = StyleSheet.MovePartBtn_Dark;
    } else {
      toggleDarkBtnStyle = StyleSheet.MovePartBtn;
    }
  } else {
    if (props.darkMode) {
      toggleDarkBtnStyle = StyleSheet.MovePartBtn_Dark_Local;
    } else {
      toggleDarkBtnStyle = StyleSheet.MovePartBtn_First;
    }
  }

  if(props.darkMode) {
    document.body.style.backgroundColor = "#292828"
  } else {
    document.body.style.backgroundColor = "#f3f3f3"
  }

  return (
    <div className={props.darkMode ? StyleSheet.Main_Dark : StyleSheet.Main}>
      <div className={StyleSheet.NavContainer}>
        <nav
          className={
            props.darkMode
              ? StyleSheet.Navigation_Dark
              : StyleSheet.Navigation_Light
          }
        >
          <ul>
            <li>
              <NavLink
                exact
                activeStyle={{
                  boxSizing: "border-box",
                  padding: "0px 2px 5px 2px",
                  textAlign: "center",
                  border: "2px solid #e50000",
                  borderLeft: "transparent",
                  borderTop: "transparent",
                  borderRight: "transparent",
                }}
                to="/"
              >
                خانه
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  boxSizing: "border-box",
                  padding: "0px 2px 5px 2px",
                  textAlign: "center",
                  border: "2px solid #e50000",
                  borderLeft: "transparent",
                  borderTop: "transparent",
                  borderRight: "transparent",
                }}
                to="/categories"
              >
                دسته بندی
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  boxSizing: "border-box",
                  padding: "0px 2px 5px 2px",
                  textAlign: "center",
                  border: "2px solid #e50000",
                  borderLeft: "transparent",
                  borderTop: "transparent",
                  borderRight: "transparent",
                }}
                to="/hot-posts"
              >
                مطالب داغ
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  boxSizing: "border-box",
                  padding: "0px 2px 5px 2px",
                  textAlign: "center",
                  border: "2px solid #e50000",
                  borderLeft: "transparent",
                  borderTop: "transparent",
                  borderRight: "transparent",
                }}
                to="/about"
              >
                درباره سایت
              </NavLink>
            </li>
          </ul>
          <div
            className={StyleSheet.ModeView}
            onClick={props.changeViewFunction}
          >
            <div
              className={StyleSheet.ToggleBtn}
              onClick={props.changeViewFunction}
            >
              <div className={toggleDarkBtnStyle}></div>
            </div>
            <span onClick={props.changeViewFunction}>حالت شب</span>
          </div>
          <div className={StyleSheet.SearchBox}>
            <label>
              <div className={StyleSheet.SearchIcon} onClick={onSearchMode}>
                <img src={SearchIcon} alt="جستجو" />
              </div>
              <input
                className={searchBarStyle}
                type="text"
                onChange={props.getSearchQueryFunction}
                value={props.searchQuery}
                placeholder="جستجو کن"
                onKeyDown={onSearchModeEnterCode}
                onBlur={props.onBlurSearchFunction}
              />
            </label>
          </div>
          <div className={StyleSheet.LogoContainer}>
            <NavLink to="/">
              <img src={Logo} alt="zoomit-no-ad" />
            </NavLink>
          </div>
        </nav>
      </div>
      <div
        className={StyleSheet.SNavContainer}
        style={{ backgroundColor: props.darkMode ? "#292828" : "#f3f3f3" }}
      >
        <nav>
          <div
            className={StyleSheet.BackDrop}
            style={{
              transform: props.showSMenu
                ? "translateX(0)"
                : "translateX(1000vw)",
            }}
            onClick={props.onShowSMenu}
          ></div>
          <div
            className={StyleSheet.MenuIcon}
            onClick={() => {
              props.onShowSMenu();
              props.onSmallMenuIcon();
            }}
          >
            <span
              className={
                props.showSMenu
                  ? StyleSheet.Cross1_Active
                  : props.smallMenuMore
                  ? StyleSheet.Cross1_DeActive
                  : StyleSheet.Cross1
              }
            ></span>
            <span
              className={
                props.showSMenu
                  ? StyleSheet.Cross2_Active
                  : props.smallMenuMore
                  ? StyleSheet.Cross2_DeActive
                  : StyleSheet.Cross2
              }
            ></span>
            <span
              className={
                props.showSMenu
                  ? StyleSheet.Cross3_Active
                  : props.smallMenuMore
                  ? StyleSheet.Cross3_DeActive
                  : StyleSheet.Cross3
              }
            ></span>
          </div>
          <div
            className={
              props.showSMenu
                ? StyleSheet.MenuList_Active
                : props.smallMenuMore
                ? StyleSheet.MenuList_DeActive
                : StyleSheet.MenuList
            }
          >
            <div className={StyleSheet.SModeContainer}>
              <div className={StyleSheet.SModeChanger}>
                <div
                  className={StyleSheet.ModeView}
                  onClick={props.changeViewFunction}
                >
                  <div
                    className={StyleSheet.ToggleBtn}
                    onClick={props.changeViewFunction}
                  >
                    <div className={toggleDarkBtnStyle}></div>
                  </div>
                  <span
                    onClick={props.changeViewFunction}
                    style={{ color: "black", fontSize: "22px" }}
                  >
                    حالت شب
                  </span>
                </div>
              </div>
            </div>
            <ul>
              <li onClick={props.onShowSMenu}>
                <NavLink
                  exact
                  activeStyle={{
                    color: "#e50000",
                  }}
                  to="/"
                >
                  خانه
                </NavLink>
              </li>
              <li onClick={props.onShowSMenu}>
                <NavLink
                  exact
                  activeStyle={{
                    color: "#e50000",
                  }}
                  to="/search"
                >
                  جستجو
                </NavLink>
              </li>
              <li onClick={props.onShowSMenu}>
                <NavLink
                  exact
                  activeStyle={{
                    color: "#e50000",
                  }}
                  to="/categories"
                >
                  دسته بندی
                </NavLink>
              </li>
              <li onClick={props.onShowSMenu}>
                <NavLink
                  exact
                  activeStyle={{
                    color: "#e50000",
                  }}
                  to="/hot-posts"
                >
                  مطالب داغ
                </NavLink>
              </li>
              <li onClick={props.onShowSMenu}>
                <NavLink
                  exact
                  activeStyle={{
                    color: "#e50000",
                  }}
                  to="/about"
                >
                  درباره سایت
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={StyleSheet.SLogoContainer}>
            <NavLink to="/">
              <img src={Logo} alt="zoomit-no-ad" />
            </NavLink>
          </div>
        </nav>
      </div>
      <div className={StyleSheet.Container}>{props.children}</div>
    </div>
  );
};

export default withRouter(layout);

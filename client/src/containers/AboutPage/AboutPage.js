import React, { Component } from "react";
import { connect } from "react-redux";

import Description from "../../components/aboutPageEl/description/description";

class AboutPage extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Description darkMode={this.props.darkMode} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  darkMode: state.darkMode
})

export default connect(mapStateToProps)(AboutPage);

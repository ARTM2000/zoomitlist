import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";

import StyleSheet from "./imagePlaceHolder.module.css";

class imagePlaceHolder extends Component {
    state = {
        imageRef: React.createRef()
    }

    componentDidMount() {
        forceCheck();
    }

    render() {
      let bRadius;
      if (window.innerWidth <= 520 && this.props.BRadios.split(" ")[2] === "10px") {
        bRadius = "0 10px 0 0"
      } else {
        bRadius = this.props.BRadios ? this.props.BRadios : "0"
      }

        return (
          <LazyLoad
            // height={100}
            offset={600}
            once
          >
            <img
              className={StyleSheet.Image}
              style={{
                borderRadius: bRadius,
              }}
              alt={this.props.ImageAlt}
              src={this.props.ImageSrc}
              title={this.props.ImageAlt}
              ref={this.state.imageRef}
            />
          </LazyLoad>
        );
    }
}

export default imagePlaceHolder;

import React from "react";

import StyleSheet from "./button.module.css";

const button = (props) => {
    let style;

    switch (props.mode) {
        case "normal": 
            style = StyleSheet.Normal;
            break;

        case "important": 
            style = StyleSheet.Important;
            break;

        case "lowImp": 
            style = StyleSheet.LowImp;
            break;

        default:
            style = ""
    }

    return <button className={style} onClick={props.clickFunction}>{props.children}</button>;
}

export default button;

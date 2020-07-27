import React from 'react';

import StyleSheet from './spinner.module.css';

const spinner = (props) => (
    <div className={StyleSheet.Main} style={{height: props.height}} >
        <div className={StyleSheet.LoadingContainer} style={{margin: `${props.marginTopBut} auto`}} >
            <div className={StyleSheet.ElementOne}></div>
            <div className={StyleSheet.ElementTwo}></div>
        </div>
    </div>
);

export default spinner;
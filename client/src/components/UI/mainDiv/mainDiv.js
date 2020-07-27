import React from 'react';

import StyleSheet from './mainDiv.module.css';

const mainDiv = (props) => (<div className={StyleSheet.Main} style={props.style ? props.style : {}}>
    {props.children}
</div>);

export default mainDiv;
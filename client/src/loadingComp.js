import React from 'react';
//styles
import LoadingCompStyles from './loadingCompStyles';

const LoadingComp = (props) => {
    //styles
    const classes = LoadingCompStyles()
    //props
    const { description } = props;

    return (
        <div className={classes.loadingComp}>
            <div className={classes.dot}></div>
            <span>{description}</span>
        </div>
    );
};

export default LoadingComp;
/**
* @file
* @author jc
*/

import React from 'react';
import './index.less';

const PRE_FIX = 'project-container';

import {connect} from 'react-redux';
import {addNumAction} from '@/actionCreators';

const Project: React.FC = (props: any) => {
    const domRef = React.createRef<HTMLDivElement>();
    const handleClick = async () => {
        // console.log('result: ', result);
        await props.add();
    };
    return (
        <div className={PRE_FIX}>
            project
            <h1>{props.name}</h1>
            <h2 ref={domRef}>{props.num}</h2>
            <button onClick={handleClick}>dispatch</button>
        </div>
    );
};

export default connect(
    state => state,
    dispatch => ({
        // @ts-ignore
        add: async () => dispatch(addNumAction)
    })
)(Project);
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createScreen } from '../../actions/actionCreators';

function ScreensPager(props) {
    return (
        <div className='screens-pager'>
            <nav>
                <ul>
                    {Object.keys(props.screens).map(screenId => {
                        return <li key={screenId}><NavLink to={'/screen/' + screenId}>{'Screen ' + screenId}</NavLink></li>;
                    })}
                </ul>
            </nav>
            <button className='add-new-screen' type='button' onClick={props.createScreen}>+</button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        screens: { ...state.screens }
    };
}

const mapDispatchToProps = dispatch => {
    return {
        createScreen: () => dispatch(createScreen())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreensPager));
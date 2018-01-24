import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScreensPager from '../components/ScreensPager/ScreensPager';
import Screen from '../components/Screen/Screen';

class App extends Component {
  componentWillMount() {
    this.props.history.push('/screen/1');
  }

  render() {
    return (
      <div className='canvas-screens'>
        <ScreensPager />
        <Screen />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    screens: { ...state.screens }
  };
}

export default connect(mapStateToProps)(App);

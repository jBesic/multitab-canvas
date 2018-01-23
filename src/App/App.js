import React, { Component } from 'react';

import ScreensPager from '../components/ScreensPager/ScreensPager';
import Screen from '../components/Screen/Screen';

class App extends Component {
  render() {
    return (
      <div className='canvas-screens'>
        <ScreensPager />
        <Screen />
      </div>
    );
  }
}

export default App;

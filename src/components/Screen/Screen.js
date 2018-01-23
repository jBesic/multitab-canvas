import React from 'react';
import { Route } from 'react-router-dom';

import ScreenStats from '../ScreenStats/ScreenStats';
import Canvas from '../Canvas/Canvas';
import ScreenConfig from '../ScreenConfig/ScreenConfig';

function Screen(props) {
    return (
        <div className='screen'>
            <Route path='/screen/:screen_id' component={Canvas} />
            <Route path='/screen/:screen_id' component={ScreenConfig} />
            <Route path='/screen/:screen_id' component={ScreenStats} />
        </div>
    );
}

export default Screen;
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import freezeState from 'redux-freeze-state';

import App from './App/App';
import reducer from './reducers/reducer';

let store = createStore(freezeState(reducer), {
    screens: {
        1: {
            screenId: 1,
            isDeleted: false
        }
    },
    shapes: {},
    history: {
        indexInHistory: null,
        shapesState: []
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

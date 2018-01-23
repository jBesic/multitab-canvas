import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/App';
import reducer from './reducers/reducer';

let store = createStore(reducer, {
    screens: {
        1: {
            screenId: 1,
            isDeleted: false
        }
    },
    shapes: {},
    colors: {}
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

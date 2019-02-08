import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reduxThunk from 'redux-thunk'; //import thunk from 'redux-thunk'in REST stage we did it to request to api asyncly

import reducers from './reducers';
import App from './components/App';




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers , composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>
        , document.querySelector('#root'));
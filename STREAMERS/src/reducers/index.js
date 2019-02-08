import { combineReducers } from 'redux';
import { reducer } from 'redux-form'; // for activating form

import streamReducer from './streamReducer';
import authReducer from './authReducer';

export default combineReducers ({
    auth : authReducer,
    form : reducer, // its way to register redux form in reducers
    streams : streamReducer
});
    









import _ from 'lodash';
import {
    FETCH_STREAMS ,
    CREATE_STREAM ,
    FETCH_STREAM ,
    DELETE_STREAM,
    EDIT_STREAM 
} from '../actions/types';

export default (state = {} , action) => {
    switch (action.type) {
        case FETCH_STREAMS :      //get string of id and turn each index of arry to obj with 'id' key
            return {...state , ..._.mapKeys(action.payload , 'id')};
        case FETCH_STREAM :
            return {...state , [action.payload.id] : action.payload };
        case CREATE_STREAM :
            return {...state , [action.payload.id] : action.payload };
        case EDIT_STREAM :
            return {...state , [action.payload.id] : action.payload };
            // consider delete action payload only contain id
        case DELETE_STREAM :
            // not change orginal state make new obj
            return _.omit(state , action.payload);
        default :
            return state;
    }
}
//we use _.omit(state obj , string of key we want to remove) from lo dash to delete property from obj
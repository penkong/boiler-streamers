import streams from '../apis/streams';
import history from '../history'; //importing for action creator use for programmatic navigation
import {  //action creators
    SIGN_IN ,
    SIGN_OUT ,
    FETCH_STREAMS ,
    CREATE_STREAM ,
    FETCH_STREAM ,
    DELETE_STREAM ,
    EDIT_STREAM 
} from "./types";

export const signIn = (userId) => {
    return {
        type : SIGN_IN, 
        payload : userId
    };
};
export const signOut = () => {
    return {
        type : SIGN_OUT,
    };
}; 
// to make req over api by creating new action
//this will be called with list of different values we input to form as arg
    //---------using redux thunk to async it
    //-----it also must catch userid for us to know who create it and let be editable for creator
    // and must post that in /streams 
                        //when we return func from actioncreator func call auto by thunk
                        // and get 2 args second is getState = alow us to reach redux store and pull out some info
export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;      // now we have user id  and  catch it in create route
    const response = await streams.post('/streams', { ...formValues, userId });
    // this dispatch is real action we send
    dispatch({
        type : CREATE_STREAM ,
        payload : response.data
    });
    //we do programmatic nav (handler) to back user to the root //history in browser router also can change addres bar
    // we create history obj ourselfs to impediment react rout dom to do this and 
    //we can easily access it ==> we create plain router
    history.push('/');
};
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({
        type : FETCH_STREAMS ,
        payload : response.data
    });
};
export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
        type : FETCH_STREAM ,
        payload : response.data
    });
};
// for obj {...state , el : bye} easier
//we update stream like array.map(el=> el ===hi ? bye : hi )
// if in reducer we dont bring new obj redux consider we dont update
//then always use const newstate = {...state} [animal.paload.id] is key interpolation
export const editStream = (id , formValues) => async dispatch => {
                                        //because we sure make communicte  -- we use in body
    const response = await streams.patch(`/streams/${id}` , formValues);
    dispatch({
        type : EDIT_STREAM ,
        payload : response.data
    });
    // bring back user to root of app
    history.push('/')
};
//because we dont need reponse we just dont use const
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({
        type : DELETE_STREAM ,
        payload : id
    }); 
    history.push('/')
};
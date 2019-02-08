import { SIGN_IN , SIGN_OUT } from "../actions/types";
//we use reducer inside comp by mapStatetoProps()
const INITAIL_STATE = {
    isSignedIn : null,
    userId : null
};
// in this app because anyway we have initial state we use obj not null or empty array
// that property related to authentication
export default  (state = INITAIL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN :
            return { ...state , isSignedIn : true , userId : action.payload}
        case SIGN_OUT:
            return { ...state , isSignedIn : false , userId : null}
        default : 
            return state
    }
}  
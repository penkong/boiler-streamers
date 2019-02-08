import React from 'react';
import { connect } from 'react-redux';
import { signIn , signOut } from '../actions'; // we use it in onAuthChange as props


class GoogleAuth extends React.Component {
    // without redux way ***  ===== >>>   state = { isSignedIn : null };
    //for google auth we do all of this
    componentDidMount() {
        //first we must load google lib // callback is for cause of its take time loadup our data
        window.gapi.load('client:auth2', () => {
            //then we initalize register auth client id  //async
            ///////  LEARNING : we must always read docs to find out our wanting object to catch it from DOM or BOM
            window.gapi.client.init ({
                //init return promise and dont need callback
                // we take client id from google developers page to let us connect and also import script library to index.html
                clientId : '145530261706-p2tcb8jbmdnlpsfbig8rkqv20fe22dqq.apps.googleusercontent.com',
                scope : 'email' //where we want to access from user inofz
            }).then (()=>{
                //we first get refrence  // we get copy of it
                this.auth = window.gapi.auth2.getAuthInstance(); //take instance of authentication
                //component level state (is bad we use redux for state)
                // **** ====== >> this.setState ({ isSignedIn : this.auth.isSignedIn.get() })
                this.onAuthChange(this.auth.isSignedIn.get()) // upadate it
                this.auth.isSignedIn.listen(this.onAuthChange); //wait for change in future
            });
        });
    };
    onAuthChange = isSignedIn => {
        if (isSignedIn) { //signIn come from action creators
            this.props.signIn(this.auth.currentUser.get().getId()); // if issignedin true catch id for us
        } else {
            this.props.signOut();
        }
    };
    //--------------------------------------------------------------------------------
    // these on click guys send info to action creator then they send to reducer and... till come back in onAuthChange
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };
    renderAuthButton () {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            );
        }
    };

    render () {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}
// in reality we recive isSignedin from gooogle and we prop it by below to let it flow in  here and to connect and store finally as state repository
const mapStateToProps = (state) => {
    return { isSignedIn : state.auth.isSignedIn }
}

export default connect(mapStateToProps , {signIn, signOut} )(GoogleAuth);
/* eslint-disable no-unused-vars */
import React , { Component } from 'react'; 
//component //function(work like connect)
/////with this we attempt to create net req to json api
//first define actioncreator
//wire up it to component to connect helper
//call action creator onSubmit()
//action creator use axios to make net req to api
//------------------
import { connect } from 'react-redux';
import { createStream } from '../../actions'
import StreamForm from './StreamForm';
class StreamCreate extends Component{
    //we catch propety from meta
    // we pass it to renderInput func
    //render error place check stream form
    //we recieve additional propety from field here
        //console.log(formProps);
        //<input {... formProps.input}/>
        //console.log(meta);   
    //<div>{meta.error}</div> this was in return up here
    //redux form have function validate
    // console.log(formValues);
       //---
       //come from connect here
       //by make these funcs arrow style in reality we BIND this func to component
    onSubmit = formValues => {
       this.props.createStream(formValues);
    }
    render () {
        //by this u can see redux form property
        //console.log(this.props);
        //redux form autmatically preventdefault
        return ( 
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}  
// validate is func of reduxform
/// ===> now you must wire up this validate func to redux form and add it below see
//export default reduxForm({ form: 'streamCreate' , validate : validate })(StreamCreate); 
export default connect(null , { createStream })(StreamCreate);
//return function and immediately inoveked by StramCreate
//recieve single obj 
// by this we give tons of props to component up here    
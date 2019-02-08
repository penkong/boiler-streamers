/* eslint-disable no-unused-vars */
import React , { Component } from 'react'; 
//component //function(work like connect)
import { Field , reduxForm } from 'redux-form';
/////with this we attempt to create net req to json api
//first define actioncreator
//wire up it to component to connect helper
//call action creator onSubmit()
//action creator use axios to make net req to api
//------------------

class StreamForm extends Component{
    //we catch propety from meta
    // we pass it to renderInput func
    renderError({ error , touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        } 
    }
    //we recieve additional propety from field here
    renderInput = ({ input , label , meta }) => {
        //console.log(formProps);
        //<input {... formProps.input}/>
        //console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    } 
    //<div>{meta.error}</div> this was in return up here
    //redux form have function validate
    // console.log(formValues);
       //---
       //come from connect here
       //by make these funcs arrow style in reality we BIND this func to component
    onSubmit = formValues => {
       this.props.onSubmit(formValues);
    }
    render () {
        //by this u can see redux form property
        //console.log(this.props);
        //redux form autmatically preventdefault
        return ( 
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}  
// validate is func of reduxform
const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        // ran if the user did not enter title
        errors.title = 'you must enter your title';
    }
    if(!formValues.description) {
        // ran if the user did not enter title
        errors.description = 'you must enter Description';
    }
    return errors;
}; 
/// ===> now you must wire up this validate func to redux form and add it below see

//export default reduxForm({ form: 'streamCreate' , validate : validate })(StreamCreate); 
export default reduxForm({ form: 'StreamForm' , validate : validate })(StreamForm); 



//return function and immediately inoveked by StramCreate
//recieve single obj 
// by this we give tons of props to component up here    
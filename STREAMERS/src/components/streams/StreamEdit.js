import React from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'; // she brings state
import { fetchStream , editStream } from '../../actions';
import StreamForm from './StreamForm';

// this props is info from Router obj
class StreamEdit extends React.Component {
    //console.log(props);
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    //call back for stream form
    onSubmit = (formValues) => {
        //console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    };
    render () {
        //console.log(this.props);
        if (!this.props.stream) {
            return <div>Loading ...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm //initialvalues is specific predefined props for redux form
                    initialValues={_.pick(this.props.stream , 'title', 'description')} 
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }    
}  

//bring list of edit streams to comp by map...
//stream edit has access to prop obj but it have access from inside
//to make accessible 2 source of info to compare and bring us new info we use
//second arg refrence to props that show on comp
const mapStateToProps = (state , ownProps) => {
    //console.log(ownProps); bring us smae obj of up
    return { stream : state.streams[ownProps.match.params.id] };
    // important lesson : every comp must fetch own data named as isolation because 
    // seprately can access to redux store
}

export default connect(mapStateToProps , { fetchStream , editStream })(StreamEdit);
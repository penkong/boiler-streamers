import React from 'react'
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

        //we use this action creator as props
//cause of use of class is we use our action creator inside compnentdidmount
 
class StreamList extends React.Component {


    componentDidMount() {
        //action creator take for us res data and in map to state
        // bring us values inside of it and then render list load those.
        this.props.fetchStreams();
    }


    renderAdmin = (stream) => {          //registerar id
        if ( stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`}className="ui button negative">Delete</Link>
                </div>
            );
        }
    }


    renderList = () => {
        //now we map through that array that mapto... made for us to ready it to put on render
        return this.props.streams.map( stream =>{
            return (
                <div className="item" key={stream.id}>

                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    
                    <div className="content">

                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>

                    </div>
                </div>
            );
        });
    }


    renderCreate = () => {
       if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign : 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        } 
    }


    render ()  {
        //console.log(this.props.streams);
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    } 
}


// make sure list of streams available as props in component
const mapStateToProps = (state) => {
    //usaulyy we turn that obj to array inside component becuase its eazier to map
    // and use in component as <ul> and ... aha
    return { 
        streams : Object.values(state.streams) ,
        currentUserId : state.auth.userId ,  //you can find this route in redux store its store there already by  createStream
        //*userId*
        isSignedIn : state.auth.isSignedIn
    };
        //toget just list of streams not obj
                //built in take obj all valvues take out in to array
}


//first we bring action creator in
//then cdm bring it for us after first load
// maptostatetoprops take us values we want 
// helper func make those ready to show 
// render method load it in jsx html
export default connect(mapStateToProps , { fetchStreams })(StreamList);
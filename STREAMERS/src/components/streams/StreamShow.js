import React from 'react'
//we need to read id out of url
// nned to call action creator to fetch specific stream
// use mapto... to bring out stream out of redux store

import { connect } from "react-redux";
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {


    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    
    // remember if we havnt yet get fetchstream
    render () {
        if(!this.props.fetchStream) {
            return <div>Loading ...</div>
        }
        const { title , description } = this.props.stream;

        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );    
    }
}

const mapStateToProps = (state , ownProps) => {
    return { stream : state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps , { fetchStream })(StreamShow);

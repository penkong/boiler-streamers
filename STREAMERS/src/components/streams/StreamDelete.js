import React from 'react'
import Modal from '../Modal';
import history from '../../history'; // to add programmatic nav to modal
// that when user create off modal disapear
//when using portal is when we create modal or try render some react comp inside
// html thats not create ed by your application
//like render react in server side app like java
import  { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';


class StreamDelete extends React.Component {


    componentDidMount() {
        //to get access to sort of var inside path
        //console.log(this.props);
        this.props.fetchStream(this.props.match.params.id)
    }
    

    renderActions () {
        //const id = this.props.match.params.id ;
        const { id } = this.props.match.params;
        // to return multiple elements  or assigned multiple elements to  single varaible
        // react.fragment and doesnt produce any html
        return ( //jsut a single tag assigned to actions also can use <> </>
            <React.Fragment> 
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>            
            </React.Fragment>
        );
    }


    //cuase of logic we use it because fetchstream is async but comp load immidietly
    renderContent () {
        if(!this.props.stream) {
            return 'Are you sure you want delete Stream?'
        }
        return `Are you sure you want delete title : ${this.props.stream.title}?`
    }


    render () {
        
        return (// because modal have own div in html we dont use div here
                <Modal 
                    title="Delete Streams"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }


}


                                //exact same obj that passed to our comp
const mapStateToProps = (state , ownProps ) => {
    // we can use this this.props.stream.title but for match path and state we use ownprops
    return { stream : state.streams[ownProps.match.params.id] }
}                                  //to get key we use ownprops on cdm
//when comp load we havnt already recieve streams then we need logic in
// render to show till fetch back show sth null or ..


export default connect(mapStateToProps , { fetchStream , deleteStream })(StreamDelete);
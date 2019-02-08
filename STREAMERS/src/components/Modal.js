import React from 'react';
import ReactDOM from 'react-dom'; // consider we import react dom here to



const Modal = props => {
        //take 2 args . first jsx
        // inside main html create new div with sth class to send modal there
    return ReactDOM.createPortal(
        // to prevent that on click happen for all page we add new onclick 
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div> ,
        document.querySelector('#modal')
    );
};

export default  Modal;
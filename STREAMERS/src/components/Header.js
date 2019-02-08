// header boilerplate
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">

            <Link to="/" className="item"><strong>Streamers</strong></Link>

            <div className="right menu">

                <Link to="/streams/new" className="item"><strong>All Streams</strong></Link>

                <GoogleAuth />

            </div>

        </div>
    ); 
};

export default Header;
  
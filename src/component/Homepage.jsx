import React from 'react';
import './css/Homepage.css';
import HackerRoomScene from './scene/HackerRoomScene';

class Homepage extends React.Component {
    render() {
        return (
            <div className="homepage">
                <h1>Welcome to Homepage</h1>
                <HackerRoomScene />
                <p>This is a placeholder component.</p>
            </div>
        );
    }
}

export default Homepage;
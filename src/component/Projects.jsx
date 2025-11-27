import React from 'react';
import './css/Homepage.css';
import MonitorsScene from './scene/MonitorsScene';

class Projects extends React.Component {
    render() {
        return (
            <div className="homepage">
                <h1>Welcome to Homepage</h1>
                <MonitorsScene />
                <p>This is a placeholder component.</p>
            </div>
        );
    }
}

export default Projects;
import React from 'react';
import './CSS/Tools.css';
// Puoi usare le icone di react-icons o le tue SVG
import { projects } from '../data/resumeData.json';


function Tools({ currentIndex }) {
    const allTools = new Set();

    if (currentIndex === null) 
        return null;

    projects[currentIndex]?.tools.forEach(tool => {
        allTools.add(tool);
    });


    return (
        <div className="program-icons-container">
            <div className="program-title">
                Tools
            </div>
            <div className="program-icons-list">
                {[...allTools].map(tool => (
                    <div className="program-icon-item" key={tool}>
                        {/* <span className="icon">{tool}</span> */}
                        <span className="label">{tool}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tools;

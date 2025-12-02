import React from 'react'
import { projects } from '../data/resumeData.json'
import { FaGithub } from 'react-icons/fa';
import './css/ProjectDescription.css'
import './css/Tools.css';


const renderWithBold = (text) => {
    if (!text) return null;

    const parts = String(text).split('**');
    return (
        <span>
            {parts.map((part, idx) =>
                idx % 2 === 1
                    ? <strong key={`bold-${idx}`}>{part}</strong>
                    : part
            )}
        </span>
    );
};


const ProjectDescription = ({ currentIndex }) => {
    const project = projects[currentIndex]

    if (!project) {
        return (
            <div className="project-placeholder"><video
                src="/portfolioMartons/placeholderProjects.webm"
                autoPlay
                loop
                muted
                playsInline
                className="project-description__video"
                style={{ width: '100%', objectFit: 'cover' }}
            >
                Your browser does not support the video tag.
            </video>

            </div>
        )
    }

    return (
        <div className="project-description">
            <div>
                <div>
                    <h2>{project.name}</h2>
                </div>
                <div style={{ paddingTop: '40px' }}>
                    <p className="project-description__text">{renderWithBold(project.description)}</p>
                </div>
            </div>
            {project.link && (
                <div className="program-icon-item project-description__link">
                    <span className="icon">{<FaGithub />}</span>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="label" style={{ textDecoration: 'none', color: 'inherit' }}>
                        GitHub Repo
                    </a>
                </div>
            )}
        </div>
    )
}

export default ProjectDescription

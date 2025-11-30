import React from 'react'
import { projects } from '../data/resumeData.json'
import { FaGithub } from 'react-icons/fa';
import './css/ProjectDescription.css'
import './css/Tools.css';

const ProjectDescription = ({ currentIndex }) => {
    const project = projects[currentIndex]

    if (!project) {
        return (
            <div className="project-placeholder">
                <video
                    src="../assets/placeholderProjects.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="project-description__video"
                    style={{ width: '100%',  objectFit: 'cover' }}
                />
            </div>
        )
    }

    return (
        <div className="project-description">
            <h2>{project.name}</h2>
            <p className="project-description__text">{project.description}</p>

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

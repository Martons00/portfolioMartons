import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import resumeData from '../data/resumeData.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './css/ProjectDescription.css'
import './css/Tools.css';

const HomePage = () => {
    const { personalInfo, summary, projects, technicalSkills } = resumeData
    const topProjects = projects.slice(0, 3)
    const mainSkills = technicalSkills.programmingLanguages.slice(0, 5)

    return (
        <div className="homepage">
            <Container>
                {/* HERO */}
                <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                    <Row className="align-items-center hero-section">
                        <Row>
                            <h1 className="mb-2">{personalInfo.name}</h1>
                            <h3 className="text-muted mb-3">{personalInfo.title}</h3>
                            <p className="lead">{summary}</p>
                        </Row>
                        <Row>
                            <Col>
                                <div className="program-icon-item project-description__link">
                                    <span className="icon">{<FaGithub />}</span>
                                    <a
                                        href={`https://${personalInfo.github}`}
                                        target="_blank" rel="noopener noreferrer" className="label" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        GitHub Profile
                                    </a>
                                </div>
                            </Col>
                            <Col>
                                <div className="program-icon-item project-description__link">
                                    <span className="icon">{<FaLinkedin />}</span>
                                    <a
                                        href={`https://${personalInfo.linkedin}`}
                                        target="_blank" rel="noopener noreferrer" className="label" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        LinkedIn Profile
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Row>

                </div>

                {/* PROGETTI IN EVIDENZA */}
                <Row className="my-4">
                    <Col>
                        <h2 className="mb-3">Featured Projects</h2>
                    </Col>
                </Row>
                <Row className="g-3">
                    {topProjects.map((project, idx) => (
                        <Col md={4} key={idx}>

                            <div className="project-description">
                                <h2>{project.name}</h2>
                                {project.link && (
                                    <div className="program-icon-item project-description__link">
                                        <span className="icon">{<FaGithub />}</span>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="label" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            GitHub Repo
                                        </a>
                                    </div>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* SKILL PRINCIPALI */}
                <Row className="my-4">
                    <Col md={6}>
                        <h2 className="mb-3">Core Skills</h2>
                        <div className="d-flex flex-wrap gap-2">
                            {mainSkills.map((skill) => (
                                <span key={skill} className="badge bg-dark-subtle text-light">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage

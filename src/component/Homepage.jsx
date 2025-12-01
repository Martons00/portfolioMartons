import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import resumeData from '../data/resumeData.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './css/ProjectDescription.css'
import './css/Tools.css';
import ProjectsSection from './ProjectsSection'
import HeroSection from './HeroSection'
import ScrollDownHint from './ScrollDown'
const HomePage = () => {
    const { personalInfo, summary, projects, technicalSkills } = resumeData
    const topProjects = projects.slice(0, 3)
    const mainSkills = technicalSkills.programmingLanguages.slice(0, 5)

    return (
        <div className="homepage">
            <Container>
                {/* HERO */}
                <HeroSection personalInfo={personalInfo} summary={summary} />

                <Row>
                    <div style={{ position: 'relative', width: '100%', height: '100px' }}>
                        <ScrollDownHint />
                    </div>

                </Row>

                {/* PROGETTI IN EVIDENZA */}
                <Row className="my-4" >
                    <ProjectsSection />
                </Row>


                {/* SKILL PRINCIPALI */}
            </Container>
        </div>
    )
}

export default HomePage

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import resumeData from '../data/resumeData.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './css/ProjectDescription.css'
import './css/Tools.css';
import ProjectsSection from './ProjectsSection'
import HeroSection from './HeroSection'
import ScrollDownHint from './ScrollDown'
import AboutPreview from './AboutPreview'
import LogoLoop from './LogoLoop'
import {
    SiReact,
    SiTypescript,
    SiThreedotjs,
    SiCplusplus,
    SiJavascript,
    SiPython,
    SiPytorch,
    SiSwift,
    SiLinux,
    SiJupyter,
    SiGit
} from 'react-icons/si';

const techLogos = [
    { node: <SiReact color="#ffffff" />, title: "React", href: "https://react.dev" },
    { node: <SiTypescript color="#ffffff" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiThreedotjs color="#ffffff" />, title: "Three.js", href: "https://threejs.org" },
    { node: <SiJavascript color="#ffffff" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiPython color="#ffffff" />, title: "Python", href: "https://www.python.org" },
    { node: <SiPytorch color="#ffffff" />, title: "PyTorch", href: "https://pytorch.org" },
    { node: <SiSwift color="#ffffff" />, title: "Swift", href: "https://swift.org" },
    { node: <SiLinux color="#ffffff" />, title: "Linux", href: "https://www.linux.org" },
    { node: <SiJupyter color="#ffffff" />, title: "Jupyter", href: "https://jupyter.org" },
    { node: <SiCplusplus color="#ffffff" />, title: "C++", href: "https://isocpp.org" },
    { node: <SiGit color="#ffffff" />, title: "Git", href: "https://git-scm.com" },
];



const HomePage = () => {
    const { personalInfo, summary, projects, technicalSkills } = resumeData
    const topProjects = projects.slice(0, 3)
    const mainSkills = technicalSkills.programmingLanguages.slice(0, 5)

    return (
        <div className="homepage">
            <Container>
                {/* HERO */}
                <HeroSection personalInfo={personalInfo} summary={summary} />
                <div style={{ position: 'relative' }}>
                    {/* Basic horizontal loop */}
                    <h2 style={{ paddingBottom: '1rem' }}>My Skills</h2>
                    <LogoLoop
                        logos={techLogos}
                        speed={120}
                        direction="left"
                        logoHeight={48}
                        gap={40}
                        hoverSpeed={0}
                        scaleOnHover
                    />
                </div>

                <Row>
                    <div style={{ position: 'relative', width: '100%', height: '100px' }}>
                        <ScrollDownHint />
                    </div>

                </Row>

                {/* PROGETTI IN EVIDENZA */}
                <Row className="my-4" >
                    <ProjectsSection />
                </Row>
                {/* COMPETENZE PRINCIPALI */}
                <Row className='my-4'>
                    <AboutPreview />
                </Row>


                {/* SKILL PRINCIPALI */}
            </Container>
        </div>
    )
}

export default HomePage

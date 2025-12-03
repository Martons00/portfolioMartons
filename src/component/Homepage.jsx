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
    SiGit,
    SiHuggingface,      // Hugging Face
    SiNumpy,            // NumPy
    SiNodedotjs,           // Node.js
    SiMysql,            // MySQL
    SiFigma,            // Figma
    SiSelenium,         // Selenium
    SiArduino,          // Arduino
    SiRaspberrypi,      // Raspberry Pi
    SiAndroidstudio     // Android Studio
} from 'react-icons/si';

const techLogos = [
    { node: <SiReact color="#ffffff" />, title: "React", href: "https://react.dev" },
    { node: <SiTypescript color="#ffffff" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiThreedotjs color="#ffffff" />, title: "Three.js", href: "https://threejs.org" },
    { node: <SiJavascript color="#ffffff" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiPython color="#ffffff" />, title: "Python", href: "https://www.python.org" },
    { node: <SiPytorch color="#ffffff" />, title: "PyTorch", href: "https://pytorch.org" },
    { node: <SiHuggingface color="#ffffff" />, title: "Hugging Face", href: "https://huggingface.co" },
    { node: <SiNumpy color="#ffffff" />, title: "NumPy", href: "https://numpy.org" },
    { node: <SiSwift color="#ffffff" />, title: "Swift", href: "https://swift.org" },
    { node: <SiLinux color="#ffffff" />, title: "Linux", href: "https://www.linux.org" },
    { node: <SiJupyter color="#ffffff" />, title: "Jupyter", href: "https://jupyter.org" },
    { node: <SiGit color="#ffffff" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiNodedotjs color="#ffffff" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiMysql color="#ffffff" />, title: "MySQL", href: "https://www.mysql.com" },
    { node: <SiFigma color="#ffffff" />, title: "Figma", href: "https://www.figma.com" },
    { node: <SiSelenium color="#ffffff" />, title: "Selenium", href: "https://www.selenium.dev" },
    { node: <SiCplusplus color="#ffffff" />, title: "C++", href: "https://isocpp.org" },
    { node: <SiRaspberrypi color="#ffffff" />, title: "Raspberry Pi", href: "https://www.raspberrypi.org" },
    { node: <SiArduino color="#ffffff" />, title: "Arduino", href: "https://www.arduino.cc" },
    { node: <SiAndroidstudio color="#ffffff" />, title: "Android Studio", href: "https://developer.android.com/studio" },
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

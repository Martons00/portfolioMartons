// HeroSection.jsx
// Component inspired by github.com/zavalit/bayer-dithering-webgl-demo

import PixelBlast from './scene/PixelBlast'
import { Row, Col } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { NavLink } from 'react-router-dom' // se ti serve in futuro
import './css/Homepage.css'

import ScrollDownHint from './ScrollDown'

export default function HeroSection({ personalInfo, summary }) {
    return (
        <div style={{ width: '100%', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>
            {/* BACKGROUND PixelBlast */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <PixelBlast
                    color="#EE4B2B"
                    patternScale={1.7}
                    patternDensity={1.5}
                />
            </div>

            {/* OVERLAY CONTENUTO HERO */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2rem',
                    color: 'white',
                }}
            >
                <div className="align-items-center hero-section" style={{ width: '100%' }}>
                    <Row>
                        <h1 className="mb-1">{personalInfo.name}</h1>
                        <h3 className="mb-3">{personalInfo.title}</h3>
                        <p className="lead">{summary}</p>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <div className="program-icon-item project-description__link">
                                <span className="icon"><FaGithub /></span>
                                <a
                                    href={`https://${personalInfo.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="label"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    GitHub Profile
                                </a>
                            </div>
                        </Col>
                        <Col>
                            <div className="program-icon-item project-description__link">
                                <span className="icon"><FaLinkedin /></span>
                                <a
                                    href={`https://${personalInfo.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="label"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    LinkedIn Profile
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

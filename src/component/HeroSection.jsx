// HeroSection.jsx
// Component inspired by github.com/zavalit/bayer-dithering-webgl-demo

import PixelBlast from './scene/PixelBlast'
import { Row, Col } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { NavLink } from 'react-router-dom' // se ti serve in futuro
import './css/Homepage.css'
import { TextType } from './CustomText'

import ScrollDownHint from './ScrollDown'

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


export default function HeroSection({ personalInfo, summary }) {
    return (
        <div style={{ width: '100%', minHeight: '60vh', position: 'relative', overflow: 'hidden' }}>
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
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2rem',
                    color: 'white',
                }}
            >
                {/* WRAPPER GRANDE: titolo+typing + paragrafo equidistante */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '40vh',
                        justifyContent: 'space-between',  // 👈 AGGIUNTA CRUCIALE
                    }}
                >
                    {/* titolo + typing in alto */}
                    <div>
                        <h1 className="mb-1">{personalInfo.name}</h1>
                        <TextType
                            text={personalInfo.titles}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="_"
                            className="mb-2"
                        />
                    </div>
                    {/* paragrafo al centro */}
                    <div style={{ margin: 'auto' }}>
                        <p className="lead" >
                            {renderWithBold(summary)}
                        </p>
                    </div>
                </div>

                {/* blocco link in fondo */}
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
    )
}

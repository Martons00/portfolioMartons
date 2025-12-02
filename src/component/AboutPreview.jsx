// BackgroundSection.jsx
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa'
import './css/ProjectDescription.css'
import './css/Tools.css';
import './css/About.css';

export default function AboutPreview() {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* BACKGROUND 3D */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,           // top:0, right:0, bottom:0, left:0
                    zIndex: 0
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    controls={false}
                    className="about-video-background"
                >
                    <source src="/portfolioMartons/aboutMe.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* OVERLAY CONTENUTI */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '2rem',
                    color: 'white',
                }}
            >
                {/* PROGETTI IN EVIDENZA */}

                {/* CTA per pagina portfolio/work */}
                <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="program-icon-item project-description__link" style={{ width: 'fit-content', alignItems: 'center' }}>
                        <NavLink
                            to="/portfolioMartons/about"
                            className="label"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            View all about me
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

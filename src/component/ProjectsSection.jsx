// BackgroundSection.jsx
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa'
import './css/ProjectDescription.css'
import './css/Tools.css';

export default function ProjectsSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      {/* BACKGROUND 3D */}
      <div
        style={{
          position: 'absolute',
          inset: 0,           // top:0, right:0, bottom:0, left:0
          zIndex: 0
        }}
      >
        <img
          src="/portfolioMartons/monitorsScenePreview.webp"
          alt="Monitors Scene Preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
          backdropFilter: 'blur(2px)',      // opzionale, effetto glass
        }}
      >
        {/* PROGETTI IN EVIDENZA */}
        <Row className="my-4">
          <Col>
            <h2 className="mb-3">Featured Projects</h2>
          </Col>
        </Row>

        {/* CTA per pagina portfolio/work */}
        <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="program-icon-item project-description__link" style={{width: 'fit-content', alignItems: 'center'}}>
            <NavLink
              to="/portfolioMartons/work"
              className="label"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              View all projects
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

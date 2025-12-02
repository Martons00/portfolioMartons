// Projects.jsx
import React, { useState, Suspense, lazy } from 'react';
import './css/Homepage.css';
import ProjectDescription from './ProjectDescription';
import Tools from './ProjectTools';
import { Col, Row } from 'react-bootstrap';

const MonitorsScene = lazy(() => import('./scene/MonitorsScene'));

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className="homepage">
      <Row>
        <Col lg={8} className="d-flex justify-content-center project-fade-in">
          <Suspense fallback={null}>
            <MonitorsScene
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </Suspense>
        </Col>
        <Col lg={4} className="d-flex align-items-center project-fade-in">
          <ProjectDescription currentIndex={currentIndex} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Tools currentIndex={currentIndex} />
        </Col>
      </Row>
    </div>
  );
};

export default Projects;

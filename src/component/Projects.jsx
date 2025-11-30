import React from 'react';
import './css/Homepage.css';
import MonitorsScene from './scene/MonitorsScene';
import ProjectDescription from './ProjectDescription';
import Tools from './ProjectTools';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(null); // null = base

    return (
        <div className="homepage">
            <Row>
                <Col lg={8} >
                    <MonitorsScene currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                </Col>
                <Col lg={4} className="d-flex align-items-center">
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
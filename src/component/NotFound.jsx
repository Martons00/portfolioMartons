import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './css/NotFound.css';
import LaptopScene from './scene/LaptopScene';   // path corretto al file

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/portfolioMartons');
  };

  return (
    <Row className="justify-content-center text-center" style={{ minHeight: '60vh', alignItems: 'center' }}>
      <Col md={12} className="notfound-hero">
        <LaptopScene />
        <div className="notfound-overlay">
          <h1>Where are you going?</h1>
          <button onClick={handleGoHome}>
            Come back to homepage
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;

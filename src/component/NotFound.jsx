import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './CSS/Header.css';
import ThreeScene from './ThreeScene';   // path corretto al file

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/portfolioMartons');
  };

  return (
    <Row className="justify-content-center text-center" style={{ minHeight: '60vh', alignItems: 'center' }}>
      <Col md={8}>
        <ThreeScene />
        <h1 style={{ marginTop: '1.5rem' }}>Where are you going?</h1>
        <button
          onClick={handleGoHome}
          style={{ width: '40%', marginTop: '1rem' }}
        >
          Come back to homepage
        </button>
      </Col>
    </Row>
  );
};

export default NotFound;

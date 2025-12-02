import { Col, Row } from 'react-bootstrap';
import { education, experience, achievements } from '../data/resumeData.json';
import { title, sections } from '../data/aboutData.json';
import React from "react";
import TiltedCard from './TiltedCard';
import './css/TiltedCard.css';
import { DecryptedText } from './CustomText';
import './css/About.css';
import { randInt } from 'three/src/math/MathUtils.js';

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



const About = () => {
    // Array di immagini - aggiorna con i tuoi percorsi
    const images = [
        '/portfolioMartons/img/Me.jpg',
        '/portfolioMartons/img/Napoli_00.jpg',
        '/portfolioMartons/img/Ballet_00.jpg',
        '/portfolioMartons/img/Ballet_01.jpg',
        '/portfolioMartons/img/Ballet_02.jpg',
        '/portfolioMartons/img/Ballet_03.jpg',
        '/portfolioMartons/img/Fire_00.jpg',
        '/portfolioMartons/img/Fire_01.jpg',
    ];
    const sizes = [
        5, 6, 7, 8, 6, 5, 7, 8
    ]

    return (
        <div className="homepage">
            <Row className="about-title-wrapper">
                <video autoPlay loop muted className="about-video-background">
                    <source src="/portfolioMartons/aboutMe.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Row>

            {/* Mappare dinamicamente le sezioni */}
            {sections.map((section, index) => (
                <MySection
                    key={index}
                    type={index % 2} // Alterna tra tipo 0 e 1
                    size={sizes[index % sizes.length]} // Dimensione casuale tra 5 e 7
                    heading={section.heading}
                    paragraphs={section.paragraphs}
                    img={images[index % images.length]} // Cicla attraverso le immagini
                    caption={section.heading}
                />
            ))}
        </div>
    );
};

const MySection = ({ type, size, heading, paragraphs, img, caption }) => {
    const textContent = (
        <div>
            <h2 className="section-heading">{heading}</h2>
            {paragraphs.map((paragraph, idx) => (
                <p key={idx} className="section-paragraph">
                    {renderWithBold(paragraph)}
                </p>
            ))}
        </div>
    );

    if (type === 0) {
        return (
            <Row className="about-section">
                <Col lg={size} style={{ paddingLeft: '50px',paddingRight: '50px', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' }}>
                    {textContent}
                </Col>


                <Col lg={12 - size} style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TiltedCard
                        imageSrc={img}
                        altText={caption}
                        captionText={caption}
                        containerHeight="100%"
                        containerWidth="90%"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                    />
                </Col>
            </Row>
        );
    } else if (type === 1) {
        return (
            <Row className="about-section">
                <Col lg={size} style={{  minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TiltedCard
                        imageSrc={img}
                        altText={caption}
                        captionText={caption}
                        containerHeight="100%"
                        containerWidth="90%"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                    />
                </Col>
                <Col lg={12 - size} style={{ minHeight: '350px',paddingRight: '50px', paddingLeft: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' }}>
                    {textContent}
                </Col>


            </Row>
        );
    } else {
        return null;
    }
};

export default About;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Header.css'; // File CSS personalizzato
import { TextType } from './CustomText';


function Header(props) {
  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Aggiorna lo stato in base alle dimensioni della finestra
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Chiude il menu dopo il click su un link
  const closeMenu = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      expand="md"
      expanded={expanded}
      onToggle={setExpanded}
      className="w-100 custom-navbar"
    >
      <Container fluid>
        {/* Logo del sito */}
        <Navbar.Brand as={NavLink} to="/portfolioMartons" onClick={closeMenu}>
          <TextType
            text={["Raffaele_Martone","Martone_Raffaele","Portfolio_RM","RM_Portfolio"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
          />
        </Navbar.Brand>

        {!isDesktop && (
          <button
            className="open-menu-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Close Menu" : "Open Menu"}
          </button>
        )}


        {/* Menu di navigazione */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={isDesktop ? "mx-auto" : "ms-0"}>
            <Nav.Link
              as={NavLink}
              to="/portfolioMartons/work"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/portfolioMartons/experiences"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Experiences
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/portfolioMartons/about"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Me
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/portfolioMartons/contact"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

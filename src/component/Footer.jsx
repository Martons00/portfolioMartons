import React from 'react';
import { NavLink } from 'react-router-dom';
import './CSS/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="copyright">
            © {new Date().getFullYear()} Raffaele Martone
          </p>
        </div>
        
        <div className="footer-center">
          <nav className="footer-nav">
            <ul>
              <li>
                <NavLink to="/portfolioMartons/work">
                  Work
                </NavLink>
              </li>
              <li>
                <NavLink to="/portfolioMartons/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/portfolioMartons/journal">
                  Journal
                </NavLink>
              </li>
              <li>
                <NavLink to="/portfolioMartons/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="https://github.com/Martons00" target="_blank" rel="noopener noreferrer">
              Github
            </a>
            <a href="mailto:raffaelemartone34@gmail.com" target="_blank" rel="noopener noreferrer">
              Mail
            </a>
            <a href="https://www.linkedin.com/in/raffaele-martone00/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

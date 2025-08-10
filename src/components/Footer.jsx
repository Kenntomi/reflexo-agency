import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-block">
          <h3>Reflexo Agency</h3>
          <p>Impulsando negocios digitales desde 2025.</p>
        </div>
        <div className="footer-block">
          <h4>Contacto</h4>
          <p><FiMail style={{ marginRight: 6 }} /> contacto@reflexoagency.com</p>
          <p><FiPhone style={{ marginRight: 6 }} /> +51 999 888 777</p>
        </div>
        <div className="footer-block">
          <h4>Síguenos</h4>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <FiFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <FiInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copy">
        <p>&copy; 2025 Reflexo Agency. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
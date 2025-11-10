import "./Footer.css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

export const Footer = () => {
  return (
    <footer>
      <div className="inner footer-container">
        <div className="links">
          <nav className="enlaces-footer">
            <ul>
              <a href="#">
                <li>Sobre Nosotros</li>
              </a>
              <a href="#">
                <li>Contáctanos</li>
              </a>
            </ul>
          </nav>
          <div className="social-media">
            <a href="#">
              <span className="red">
                <AiFillInstagram />
              </span>
            </a>
            <a href="#">
              <span className="red">
                <AiFillFacebook />
              </span>
            </a>
            <a href="#">
              <span className="red">
                <AiFillLinkedin />
              </span>
            </a>
          </div>
        </div>
        <div className="copyright">
          <small>
            © 2025 StreamMap - Todos los contenidos externos son propiedad de
            sus legítimos propietarios.
          </small>
        </div>
      </div>
    </footer>
  );
};

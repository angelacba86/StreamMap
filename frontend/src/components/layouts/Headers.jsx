import { useState } from "react";
import "/logo.svg";
import "./Header.css";
import { SearchingInput } from "../atoms/SearchingInput";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="inner header-container">
          {/* Logo */}
          <Link to="/">
            <img src="/logo.svg" alt="Logo" width={150} />
          </Link>
          
          {/* Input de búsqueda - Desktop */}
          <div className="search-desktop">
            <SearchingInput />
          </div>
          
          {/* Navegación Desktop */}
          <nav className="nav-desktop">
            <ul>
              <Link to="/movie/top_rated">
                <li>Películas</li>
              </Link>
              <Link to="/tv/top_rated">
                <li>Series</li>
              </Link>
            </ul>
            <button className="sesion">Iniciar Sesión</button>
          </nav>

          {/* Botón hamburguesa - Mobile */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Input de búsqueda - Mobile (segunda fila) */}
        <div className="inner search-mobile">
          <SearchingInput />
        </div>

        {/* Navegación Mobile (menú lateral) */}
        {isMenuOpen && (
          <div className="overlay" onClick={toggleMenu}></div>
        )}
        <nav className={`nav-mobile ${isMenuOpen ? 'nav-open' : ''}`}>
          <button className="sesion">Iniciar Sesión</button>
          <ul>
            <Link to="/movie/top_rated" onClick={toggleMenu}>
              <li>Películas</li>
            </Link>
            <Link to="/tv/top_rated" onClick={toggleMenu}>
              <li>Series</li>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
};
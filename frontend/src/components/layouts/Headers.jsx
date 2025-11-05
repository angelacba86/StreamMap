import "/logo.svg";
import "./Header.css";
import { SearchingInput } from "../atoms/SearchingInput";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header >
        <div className="inner header-container">
        <Link to="/"><img src="/logo.svg" alt="Logo" width={150} /></Link>
        <SearchingInput />
        <nav>
          <ul>
          <Link to="/movie/top_rated"><li>Películas</li></Link>
          <Link to="/tv/top_rated"><li>Series</li></Link>
          </ul>
          <button className="sesion">Iniciar Sesión</button>
        </nav>
        </div>
      </header>
    </>
  );
};

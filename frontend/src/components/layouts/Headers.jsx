import "/logo.svg";
import "./Header.css";
import { SearchingInput } from "../atoms/SearchingInput";

export const Header = () => {
  return (
    <>
      <header >
        <div className="inner header-container">
        <img src="/logo.svg" alt="Logo" width={150} />
        <SearchingInput />
        <nav>
          <ul>
          <a href="#"><li>Películas</li></a>
          <a href="#"><li>Series</li></a>
          </ul>
          <button className="sesion">Iniciar Sesión</button>
        </nav>
        </div>
      </header>
    </>
  );
};

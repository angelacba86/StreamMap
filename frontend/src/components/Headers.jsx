import "/logo.svg";
import "./Header.css";
import { SearchingInput } from "./SearchingInput";

export const Header = () => {
  return (
    <>
      <header className="principal">
        <img src="/logo.svg" alt="Logo" width={150} />
        <SearchingInput />
        <nav>
          <a href="#">Películas</a>
          <a href="#">Series</a>
          <button className="sesion">Iniciar Sesión</button>
        </nav>
      </header>
    </>
  );
};

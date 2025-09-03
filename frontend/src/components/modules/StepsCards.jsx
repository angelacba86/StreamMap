import "./StepsCards.css";
import { FaSearch } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaDisplay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export const StepsCards = () => {
  return (
    <div className="cards-content">
      <div className="card">
        <div className="icon">
          <FaSearch />
        </div>

        <h2>Busca tu película o serie</h2>
        <p>
          🔍 Escribe el título en nuestro buscador En segundos, StreamMap
          encuentra el contenido que quieras, sin importar la región.
        </p>
      </div>
      <div className="card">
        <div className="icon">
          <TbWorld />
        </div>
        <h2>Explora disponibilidad global</h2>
        <p>
          🌍 Mira en qué países y servicios de streaming está disponible
          Olvídate de catálogos limitados: tendrás el mapa completo, región por
          región.
        </p>
      </div>
      <div className="card">
        <div className="icon">
          <FaDisplay />
        </div>
        <h2>Elige tu servicio y región</h2>
        <p>
          📺 Selecciona la mejor opción para ti Ya sea Netflix en EE.UU., Prime
          Video en España o Disney+ en Canadá, tú decides dónde verlo.
        </p>
      </div>
      <div className="card">
        <div className="icon">
          <FaLock />
        </div>
        <h2>Conéctate y disfruta con tu VPN</h2>
        <p>
          🔐 Accede como si estuvieras en otro país Con un clic, desbloquea el
          contenido y disfruta de tu serie o película sin fronteras.
        </p>
      </div>
    </div>
  );
};

import "./StepsCards.css";
export const StepsCards = () => {
  return (
    <div className="cards-content">
      <div className="card">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <h2>Busca tu película o serie</h2>
        <p>
          🔍 Escribe el título en nuestro buscador En segundos, StreamMap
          encuentra el contenido que quieras, sin importar la región.
        </p>
      </div>
      <div className="card">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path
              d="M12 2a15.3 15.3 0 0 1 0 20 
           M12 2a15.3 15.3 0 0 0 0 20"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <h2>Elige tu servicio y región</h2>
        <p>
          📺 Selecciona la mejor opción para ti Ya sea Netflix en EE.UU., Prime
          Video en España o Disney+ en Canadá, tú decides dónde verlo.
        </p>
      </div>
      <div className="card">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
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

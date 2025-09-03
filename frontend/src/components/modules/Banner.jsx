import "./Banner.css";
export const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-foto">
        <img src="/posters_varios.png" alt="posters" />
      </div>
      <div className="banner-texto">
        <h1>DESCUBRE DONDE VER LO QUE QUIERAS, SIN FRONTERAS</h1>
        <p>
          Con StreamMap encuentra en qué país y en qué servicio de streaming
          está disponible tu película o serie favorita. Una sola búsqueda, todos
          los catálogos.
        </p>
      </div>
    </div>
  );
};

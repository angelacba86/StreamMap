import { useState, useEffect } from "react";
import {
  FaStar,
  FaChartSimple,
  FaHeart,
  FaBookmark,
  FaStopwatch,
} from "react-icons/fa6";
import "flag-icons/css/flag-icons.min.css";
import "./DetailMovie.css";
import { UiButton } from "../atoms/UiButton";

export const DetailMovie = ({
  detail,
  allServices,
  selectedProvider,
  filteredProviders,
  displayedCountries,
  showAllCountries,
  LIMIT,
  onFilterChange,
  onToggleCountries,
  onOpenModal,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // Detectar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determinar qué imagen mostrar
  const shouldShowBackdrop = isMobile && detail.backdrop;
  const imageToShow = shouldShowBackdrop ? detail.backdrop : detail.poster;
  const imageSize = shouldShowBackdrop ? "w780" : "w300";

  return (
    <div className="detail">
      <div className="poster-content">
        <img
          src={
            imageToShow
              ? `https://image.tmdb.org/t/p/${imageSize}${imageToShow}`
              : "https://placehold.co/200x450?text=Sin+Imagen"
          }
          alt={detail.title}
          className={shouldShowBackdrop ? "backdrop-image" : "poster-image"}
        />
      </div>

      <div className="detail-content">
        <div className="titles">
          <h2>{detail.title}</h2>
          <h3>({detail.year})</h3>
          {detail.status && (
            <small
              className={
                detail.status === "Returning Series"
                  ? "returning"
                  : detail.status === "Ended"
                  ? "ended"
                  : detail.status === "Canceled"
                  ? "canceled"
                  : ""
              }
            >
              {detail.status}
            </small>
          )}
        </div>

        <div className="subtitles">
          {detail.genres?.map((g, i) => (
            <small className="genre" key={i}>
              {g}
            </small>
          ))}
          {detail.runtime && (
            <div className="small-icon">
              <FaStopwatch />
              {detail.runtime}
            </div>
          )}

          <div className="popularity">
            <div className="small-icon" name="rating">
              <FaStar /> {detail.rating?.toFixed(1)}
            </div>
            <div className="small-icon" name="popular">
              <FaChartSimple /> {detail.popularity?.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="save-buttons">
          <UiButton variant="icon" icon={<FaHeart />} />
          <UiButton variant="icon" icon={<FaBookmark />} />
        </div>

        <div className="description">
          <p>{detail.description || "Sin descripción disponible."}</p>
        </div>

        {/* Países con providers */}
        {detail.providers && detail.providers.length > 0 ? (
          <div className="countries">
            <div className="countries-head">
              <h2>Países Disponibles</h2>
              <select
                className="streaming"
                value={selectedProvider}
                onChange={onFilterChange}
              >
                <option value="">
                  Todos los servicios ({detail.providers.length})
                </option>
                {allServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="countries-body">
              {displayedCountries.length > 0 ? (
                displayedCountries.map((prov) => (
                  <button
                    key={prov.country}
                    className="flag-btn"
                    onClick={() => onOpenModal(prov)}
                  >
                    <small>
                      <span className={`fi fi-${prov.country.toLowerCase()}`} />{" "}
                      {prov.country}
                    </small>
                  </button>
                ))
              ) : (
                <p style={{ padding: "20px", color: "#999" }}>
                  No hay países con {selectedProvider} disponible
                </p>
              )}
            </div>
            {/* Botón Ver más / Ver menos */}
            {filteredProviders.length > LIMIT && (
              <UiButton variant="primary" onClick={onToggleCountries}>
                {showAllCountries
                  ? "Ver menos"
                  : `Ver más (${filteredProviders.length - LIMIT} más)`}
              </UiButton>
            )}
            {selectedProvider && filteredProviders.length > 0 && (
              <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                Mostrando {filteredProviders.length} de{" "}
                {detail.providers.length} países con {selectedProvider}
              </p>
            )}
          </div>
        ) : (
          <p>No hay servicios disponibles en ningún país</p>
        )}
      </div>
    </div>
  );
};

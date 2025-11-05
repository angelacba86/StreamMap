import { useEffect, useState } from "react";
import { FaStar, FaChartSimple, FaHeart, FaBookmark } from "react-icons/fa6";
import "flag-icons/css/flag-icons.min.css";
import "./DetailMovie.css";

export const DetailMovie = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/search/movie/${movieId}/full`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Cargando...</p>;
  if (!movie) return <p>No se encontraron detalles.</p>;

  return (
    <div className="detail-container">
      <img
        src={
          movie.poster
            ? `https://image.tmdb.org/t/p/w300${movie.poster}`
            : "https://placehold.co/200x350?text=Sin+Imagen"
        }
        alt={movie.title}
      />

      <div className="detail-content">
        {/* Títulos */}
        <div className="titles">
          <h2>{movie.title}</h2>
          <h3>({movie.year})</h3>
        </div>

        {/* Subtítulos */}
        <div className="subtitles">
          <small className="genre">{movie.genres?.join(", ")}</small>
          <small>{movie.runtime ? `${movie.runtime} min` : "N/D"}</small>
          <div className="popularity">
            <div className="btn-icon" name="rating">
              <FaStar /> {movie.rating?.toFixed(1) ?? "N/A"}
            </div>
            <div className="btn-icon" name="popular">
              <FaChartSimple /> {movie.popularity?.toFixed(0) ?? "N/A"}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="save-buttons">
          <button>
            <FaHeart />
          </button>
          <button>
            <FaBookmark />
          </button>
        </div>

        {/* Descripción */}
        <div className="description">
          <p>{movie.description || "Sin descripción disponible."}</p>
        </div>

        {/* Países disponibles */}
        <div className="countries">
          <div className="countries-head">
            <h2>Países Disponibles</h2>
          </div>
          <div className="countries-body">
            {movie.providers && movie.providers.length > 0 ? (
              movie.providers.map((prov) => (
                <div key={prov.country} className="flag">
                  <small>
                    <span className={`fi fi-${prov.country.toLowerCase()}`}></span>{" "}
                    {prov.country}
                  </small>
                </div>
              ))
            ) : (
              <p>No hay proveedores disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


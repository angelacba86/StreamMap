// src/components/ContentCard.jsx
import { Link } from "react-router-dom";
import "./ContentCard.css";

export const ContentCard = ({ content = [], type }) => {
  if (!content.length) {
    return <p className="no-content">No hay contenido disponible.</p>;
  }
  const normalizeContent = content.map((cont) => ({
    ...cont,
    type: type || cont.type || "default",
  }));
  return (
    <div className="content-grid">
      {normalizeContent.map((cont, index) => (
        <div key={index} className="content-card">
          <Link to={`/result/${cont.type}/${cont.id}`}>
            <img
              className="content-poster"
              src={
                cont.poster
                  ? `https://image.tmdb.org/t/p/w300${cont.poster}`
                  : "https://placehold.co/200x300?text=Sin+Imagen"
              }
              alt={cont.title || cont.name}
            />
          </Link>
          <div className="content-info">
            <h4 className="content-title">{cont.title || cont.name}</h4>
            {cont.year && <p className="content-year">{cont.year}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

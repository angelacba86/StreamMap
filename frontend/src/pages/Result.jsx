import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ContentCard } from "../components";


function Result() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/search?query=${encodeURIComponent(query)}`
        );
        
        // Traer del backend {movies: [], tv: [], people: []}
        // Combinar movies y tv en un solo array
        const data = response.data;
        const combined = [
          ...(data.movies?.map(m => ({ ...m, type: 'movie', title: m.title })) || []),
          ...(data.tv?.map(t => ({ ...t, type: 'tv', title: t.name })) || [])
        ];
        
        setResults(combined);
        console.log(combined)
      } catch (err) {
        console.error("Error al buscar:", err);
        setError("Error al realizar la búsqueda. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="result-page">
        <h2>Por favor, ingresa un término de búsqueda</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="result-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Buscando "{query}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-page">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <h2 className="section-title">
        Resultados para: "<span className="query-highlight">{query}</span>"
      </h2>
      
      {results.length > 0 ? (
        <>
          <p className="results-count">
            {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
          </p>
          <ContentCard content={results} />
        </>
      ) : (
        <div className="no-results">
          <p>No se encontraron resultados para "{query}"</p>
          <p className="suggestion">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}

export default Result;
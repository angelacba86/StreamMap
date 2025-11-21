import "./MoviesCategory.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const MoviesCategory = ({ type, category, title }) => {
  // const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const containerRef = useRef(null);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/${type}/${category}`
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error al cargar películas:", error.message);
      }
    };

    fetchMovies();
  }, []);
  const handleNext = () => {
    containerRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

  const handlePrev = () => {
    containerRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };
  return (
    <div className="content-movie-category">
      <h2>{title}</h2>
      <div className="movies-container">
        <button onClick={handlePrev}>
          <GrFormPrevious />
        </button>
        <div className="movies-subcontainer" ref={containerRef}>
          {movies.map((movie, index) => (
            <Link to={`/result/${type}/${movie.id}`} key={movie.id}>
              <div className="movie">
                <img
                  src={
                    movie.poster
                      ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                      : "https://placehold.co/200x350?text=Sin+Imagen"
                  }
                  alt={movie.title}
                />
                <span>{index + 1}</span>
              </div>
            </Link>
          ))}
        </div>
        <button onClick={handleNext}>
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

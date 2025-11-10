// src/pages/MoviesTv.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContentCard } from "../components";

function MoviesTv() {
  const { type, category } = useParams();
  const [content, setContent] = useState([]);
  const onTitle= type == "movie" ? "Películas" : "Series"
  useEffect(() => {
    if (!type || !category) return;

    const fetchContent = async () => {
      try {
        const url = `http://localhost:5000/${type}/${category}`;
        const response = await axios.get(url);
        console.log("Datos recibidos:", response.data);
        setContent(response.data || []); // ya no esperamos results
      } catch (error) {
        console.log("Error al cargar películas/series", error.message);
      }
    };

    fetchContent();
  }, [type, category]);

  return (
    <div>
      <h2 className="section-title">
        {category === "top_rated" ? `${onTitle} mejor calificadas` : category}
      </h2>
      <ContentCard content={content} type={type} />
    </div>
  );
}

export default MoviesTv;

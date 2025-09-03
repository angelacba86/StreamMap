const axios = require("axios");
const BASE_URL = "https://api.themoviedb.org/3";

const popularContentHandler = async (type, category) => {
  const url = `${BASE_URL}/${type}/${category}`;
  const response = await axios.get(url, {
    params: {
      language: "es-ES", // opcional: cambia a "en-US" si quieres
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  return response.data.results.map((item) => ({
    id: item.id,
    title: item.title || item.name,
    poster: item.poster_path,
    year:
      item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0],
    vote: item.vote_average,
  }));
};

module.exports = {
  popularContentHandler,
};

const axios = require("axios");

const searchHandler = async (name) => {
  const url = "https://api.themoviedb.org/3/search/multi";
  const response = await axios.get(url, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      query: name,
      include_adult: false,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  const results = response.data.results
  return {
    movies: results
      .filter((r) => r.media_type === "movie")
      .map((m) => ({
        id: m.id,
        title: m.title,
        poster: m.poster_path,
        year: m.release_date?.split("-")[0],
      })),

    tv: results
      .filter((r) => r.media_type === "tv")
      .map((t) => ({
        id: t.id,
        name: t.name,
        poster: t.poster_path,
        year: t.first_air_date?.split("-")[0],
      })),

    people: results
      .filter((r) => r.media_type === "person")
      .map((p) => ({
        id: p.id,
        name: p.name,
        profile: p.profile_path,
      })),
  };
};

const resultDetailsHandler = async (id, type) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}`;
  const response = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  return response;
};

const resultProvidersHandler = async (type,id) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/watch/providers`;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  return response;
};
module.exports = {
  searchHandler,
  resultDetailsHandler,
  resultProvidersHandler,
  
};

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
  return response;
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

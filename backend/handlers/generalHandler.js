const axios = require("axios");

const popularContentHandler = async (type) => {
  const url = `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`;

  const response = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  return response;
};

module.exports = {
  popularContentHandler,
};

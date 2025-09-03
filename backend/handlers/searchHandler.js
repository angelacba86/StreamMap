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
  const results = response.data.results;
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
  const result = response.data;
  let finalResult = {};
  if (type == "movie") {
    finalResult = {
      id: result.id,
      title: result.title,
      description: result.overview,
      year: result.release_date?.split("-")[0],
      runtime: result.runtime,
      poster: result.poster_path,
      backdrop: result.backdrop_path,
      popularity: result.popularity,
      rating: result.vote_average,
      genres: result.genres?.map((genre) => genre.name),
    };
  } else {
    finalResult = {
      id: result.id,
      title: result.name,
      description: result.overview,
      year: result.first_air_date?.split("-")[0],
      runtime: result.episode_run_time?.[0],
      poster: result.poster_path,
      backdrop: result.backdrop_path,
      popularity: result.popularity,
      rating: result.vote_average,
      seasons: result.number_of_seasons,
      episodes: result.number_of_episodes,
      genres: result.genres?.map((genre) => genre.name),
      status: result.status,
    };
  }
  return finalResult;
};

const resultProvidersHandler = async (type, id, filterProviders = []) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/watch/providers`;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  const results = response.data.results;
  if (!results || Object.keys(results).length === 0) return [];

  const filteredCountries = Object.entries(results)
    .map(([countryCode, data]) => {
      const providers = {};

      const filterList = (arr = []) => {
        if (filterProviders.length === 0) return arr;
        return arr.filter((p) =>
          filterProviders.some((f) =>
            f.toLowerCase() === p.provider_name.toLowerCase() ||
            f.toString() === p.provider_id.toString()
          )
        );
      };

      const flatrate = filterList(data.flatrate);
      const free = filterList(data.free);
      const ads = filterList(data.ads);

      if (flatrate.length > 0) providers.flatrate = flatrate;
      if (free.length > 0) providers.free = free;
      if (ads.length > 0) providers.ads = ads;

      if (Object.keys(providers).length === 0) return null;

      return {
        country: countryCode,
        providers,
      };
    })
    .filter(Boolean);

  return filteredCountries;
};



module.exports = {
  searchHandler,
  resultDetailsHandler,
  resultProvidersHandler,
};

const axios = require("axios");
const {
  searchHandler,
  resultDetailsHandler,
  resultProvidersHandler,
} = require("../handlers/searchHandler");

const searchResultsCtrl = async (req, res) => {
  const query = req.query.query;
  console.log("Search query:", query);
  if (!query || query.lenght < 2) {
    return res.status(400).json({ error: "Query parameter is too short or is empty" });
  }

  try {
    const response = await searchHandler(query);
     return res.status(200).json(response);
  } catch (error) {
    console.error("Error during search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}; 

const resultDetailCtrl = async (req, res) => {
  const { id, type } = req.params;

  console.log("Search id: ", id, " type: ", type);
  if (!id && !type) {
    return res
      .status(400)
      .json({ error: 'parameters "id & type" are required' });
  }
  try {
    const response = await resultDetailsHandler(id, type);
    console.log("response ", response);
    res.json(response);
  } catch (error) {
    console.error("Error during search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const resultProvidersCtrl = async (req, res) => {
  const { type, id } = req.params;
  const { provider } = req.query;
  if (!type && !id) {
    return res
      .status(400)
      .json({ error: 'parameters "id & type" are required' });
  }

  try {
    // si provider existe, lo transformamos en array
    const filterProviders = provider
      ? provider.split(",").map((p) => p.trim())
      : [];

    const response = await resultProvidersHandler(type, id, filterProviders);

    res.json(response);
  } catch (error) {
    console.error("Error during provider search:", error);
    res.status(500).json({
      error: "An error occurred while processing your request.",
    });
  }
};

const resultFullCtrl = async (req, res) => {
  const { type, id } = req.params;
  const { provider } = req.query;

  if (!type || !id) {
    return res.status(400).json({ error: 'parameters "id" & "type" are required' });
  }

  try {
    const details = await resultDetailsHandler(id, type);

    const filterProviders = provider
      ? provider.split(",").map((p) => p.trim())
      : [];
    const providers = await resultProvidersHandler(type, id, filterProviders);

    res.json({
      ...details,
      providers,
    });
  } catch (error) {
    console.error("Error fetching full details:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};
module.exports = {
  searchResultsCtrl,
  resultDetailCtrl,
  resultProvidersCtrl,
  resultFullCtrl
};

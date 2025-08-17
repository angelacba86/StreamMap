const axios = require("axios");
const {
  searchHandler,
  resultDetailsHandler,
  resultProvidersHandler,
} = require("../handlers/searchHandler");



const searchResultsCtrl = async (req, res) => {
  const query = req.query.query;
  console.log("Search query:", query);
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
 
  try {
    const response = await searchHandler(query);
    res.json(response.data);
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
    res.json(response.data);
  } catch (error) {
    console.error("Error during search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const resultProvidersCtrl = async (req, res) => {
  const { type, id } = req.params;
  if (!type && !id) {
    return res
      .status(400)
      .json({ error: 'parameters "id & type" are required' });
  }
  try {
    const response = await resultProvidersHandler(type, id);
    res.json(response.data);
  } catch (error) {
    console.error("Error during search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = {
  searchResultsCtrl,
  resultDetailCtrl,
  resultProvidersCtrl
};

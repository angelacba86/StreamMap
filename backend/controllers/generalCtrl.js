const {
  popularMovieHandler,
  popularSeriesHandler,
  popularContentHandler
} = require("../handlers/generalHandler");
const popularContentCtrl = async (req, res) => {
  const { type } = req.params;
  try {
    const response = await popularContentHandler(type);
    const vacia=0;
    res.json(response.data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while processing your request." });
  }
};
const popularMovieCtrl = async (req, res) => {
  try {
    const response = await popularMovieHandler();
    res.json(response.data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while processing your request." });
  }
};
const popularSeriesCtrl = async (req, res) => {
  try {
    const response = await popularSeriesHandler();
    res.json(response.data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while processing your request." });
  }
};
module.exports = {
  popularContentCtrl,
  popularMovieCtrl,
  popularSeriesCtrl,
};

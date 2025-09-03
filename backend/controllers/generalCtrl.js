const { popularContentHandler } = require("../handlers/generalHandler");

const popularContentCtrl = async (req, res) => {
  const { type, category } = req.params;
  // type = movie | tv
  // category = popular | top_rated | now_playing | upcoming | airing_today | on_the_air

  try {
    const data = await popularContentHandler(type, category);
    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error en getListController:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Error al obtener la lista" });
  }
};
module.exports = {
  popularContentCtrl,
};

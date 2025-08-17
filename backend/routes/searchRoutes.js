const { Router } = require("express");
const router = Router();

const {
  searchResultsCtrl,
  resultDetailCtrl,
  resultProvidersCtrl,
} = require("../controllers/searchCtrl");

router.get("/", searchResultsCtrl);
router.get("/:type/:id", resultDetailCtrl);
router.get("/:type/:id/watch/providers",resultProvidersCtrl)

module.exports = router;

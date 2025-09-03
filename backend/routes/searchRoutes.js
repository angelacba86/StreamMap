const { Router } = require("express");
const router = Router();

const {
  searchResultsCtrl,
  resultDetailCtrl,
  resultProvidersCtrl,
  resultFullCtrl,
} = require("../controllers/searchCtrl");

router.get("/", searchResultsCtrl);
router.get("/:type/:id", resultDetailCtrl);
router.get("/:type/:id/watch/providers", resultProvidersCtrl);
router.get("/:type/:id/full", resultFullCtrl);

module.exports = router;

const { Router } = require("express");
const router = Router();

const { popularContentCtrl } = require("../controllers/generalCtrl");

router.get("/:type/:category", popularContentCtrl);
module.exports = router;

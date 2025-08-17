const { Router } = require("express");
const router = Router();

const { popularContentCtrl } = require("../controllers/generalCtrl");

router.get("/popular/:type", popularContentCtrl);
module.exports = router;

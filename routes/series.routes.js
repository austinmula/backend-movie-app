const router = require("express").Router();

const { getAllShows, getOneShow } = require("../controllers/series.controller");

router.get("/", getAllShows);
router.get("/:id", getOneShow);

module.exports = router;

const router = require("express").Router();

const { getAllShows } = require("../controllers/series.controller");

router.get("/", getAllShows);

module.exports = router;

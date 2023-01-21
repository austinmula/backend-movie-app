const router = require("express").Router();

const {
  getAllShows,
  getOneShow,
  addNewShow,
  deleteShow,
} = require("../controllers/series.controller");

router.get("/", getAllShows);
router.post("/", addNewShow);
router.get("/:id", getOneShow);
router.delete("/:id", deleteShow);

module.exports = router;

const router = require("express").Router();

const {
  getFavourites,
  addToFavourites,
  checkIfFav,
  removeFromFavourites,
} = require("../controllers/favourites.controller");

router.get("/:id", getFavourites);
router.get("/:user_id/:movie_id", checkIfFav);
router.post("/add", addToFavourites);
router.delete("/remove", removeFromFavourites);

module.exports = router;

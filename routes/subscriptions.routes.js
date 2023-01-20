const router = require("express").Router();

const {
  getAllSubscriptions,
  getMySubscriptions,
  checkIfSub,
  addNewSubscription,
  removeSubscription,
} = require("../controllers/subscriptions.controller");

router.get("/:id", getMySubscriptions);
router.get("/", getAllSubscriptions);
router.get("/:user_id/:movie_id", checkIfSub);
router.post("/subscribe", addNewSubscription);
router.put("/remove", removeSubscription);

module.exports = router;

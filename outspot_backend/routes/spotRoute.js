const express = require("express");
const router = new express.Router();
const upload = require("../upload/ImageUpload");

const { userGuard } = require("../auth/auth");

const {
  addSpot,
  getSpot,
  getSpotSearch,
  deleteSpot,
  updateSpot,
  getSpotType,
  getAllSpots,
  getAllCoords,
  getSpotUser,
} = require("../controller/spotController");

router.route("/all").get(getAllSpots);
router.route("/add").post(userGuard, upload.single("img"), addSpot);
router.route("/all/coords").get(getAllCoords);
router.route("/get/me").get(userGuard, getSpotUser);
router.get("/search/:name", getSpotSearch);
router.route("/type=:type").get(getSpotType);
router.route("/:id").get(userGuard, getSpot);
router.route("/delete/:id").delete(userGuard, deleteSpot);
router.route("/update/:id").put(userGuard, upload.single("img"), updateSpot);

module.exports = router;

const express = require("express");
const sthControllers = require("../controllers/sth-controllers");
// file upload ready middelware
// const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", sthControllers.getSth);

router.get("/:sthid", sthControllers.getSthById);

router.post("/", sthControllers.postSth);

module.exports = router;

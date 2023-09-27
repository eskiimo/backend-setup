const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.get("/", usersControllers.getUsers);
router.get("/:userId", usersControllers.getUserById);

router.post("/signup", fileUpload.single("image"), usersControllers.signUp);

// router.patch(
//      "/update/:uid",
//      fileUpload.single("image"),
//      userControllers.updateUser
//    );

router.post("/login", usersControllers.logIn);

module.exports = router;

const express = require("express");
const router = express.Router();
const UserControlles = require("../app/controllers/user.controller");
const auth = require("../app/middleware/auth");


router.get("/allUsers", UserControlles.getAllUsers);

router.post("/register", UserControlles.register);

router.post("/login", UserControlles.login);
router.get("/active/:key", UserControlles.activateUser);

router.post("/forget/password", UserControlles.getPassword);
router.post("/check/code", UserControlles.checkCode);
router.patch("/set/password", UserControlles.setPassword);

router.get("/me", auth, UserControlles.me);
router.get("/dashboard", auth, UserControlles.me);

router.patch("/logout", auth, UserControlles.logout);
router.delete("/logoutAll", auth, UserControlles.logoutAll);

router.patch("/edit", auth, UserControlles.editProfile);
router.patch("/enableUser",auth, UserControlles.enableUser);
router.patch("/disableUser", auth, UserControlles.disableUser);
router.post("/addToComparsion", auth, UserControlles.addToComparsion);
router.patch("/deleteFromComparsion", auth, UserControlles.deleteFromComparsion);
router.patch("/profileImage", auth, UserControlles.editProfileImage);
router.patch("/deleteProfileImage", auth, UserControlles.deleteProfileImage);


module.exports = router;

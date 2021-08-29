const express = require("express");
const router = express.Router();
const UserControlles = require("../app/controllers/user.controller");
const auth = require("../app/middleware/auth");
const upload = require("../app/middleware/uploadFile.upload");


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
const path = require("path");
const link = path.join(
  __dirname,
  "../client/src/assets/uploads/profileImage/"
);
const fs = require("fs");
router.post(
  "/profile",
  auth,
  (req, res, next) => {
    fs.unlink(link + req.user._id + "_" + req.user.image, function (err) {
      if (err) console.error(err);
    });
    next();
  },
  upload.uploadImageProfile.single("image"),
    UserControlles.editProfileImage
);


module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const catsController = require("../controllers/cats");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



router.get("/", homeController.getIndex);

// router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/profile", ensureAuth, profileController.getProfile);

// show add a cat page
router.get("/addCat", ensureAuth, catsController.getAddCatPage);

// show all cats
router.get("/feed", homeController.getFeed);

router.get("/contact", homeController.getContact);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// update user profile
router.put('/updateProfile', upload.single("file"), profileController.updateProfile);

module.exports = router;

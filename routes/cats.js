const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const catsController = require("../controllers/cats");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

// root: /cat

// add a cat profile
router.post("/add", upload.single("file"), catsController.add);

// show profile of single cat
router.get("/:id", ensureAuth, catsController.getCat);

// get edit page
router.get('/edit/:id', catsController.editCat);

// update cat profile
router.put('/:id', upload.single("file"), catsController.updateCat)

// delete a cat 
router.delete("/:id", catsController.deleteCat)

// archive a cat
router.put('/archive/:id', catsController.updateCat)

// router.post("/addCatProfile", ensureAuth, upload.single("file"), catsController.addCat);

// router.post("/createPost", upload.single("file"), postsController.createPost);

// router.put("/likePost/:id", postsController.likePost);



module.exports = router;

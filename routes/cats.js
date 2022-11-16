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

// archive a cat
router.put('/archive/:id', catsController.updateCat)

// add a log
router.post('/log/:id', catsController.addLog)

// delete a log
router.delete('/:catId/:logId', catsController.deleteLog)




module.exports = router;

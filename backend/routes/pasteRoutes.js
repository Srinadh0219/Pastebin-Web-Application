const express = require("express");
const { createPaste, getPaste } = require("../controllers/pasteController");

const router = express.Router();

router.post("/", createPaste);
router.get("/:id", getPaste);

module.exports = router;


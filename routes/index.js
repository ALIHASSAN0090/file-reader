const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.get('/', fileController.renderHome);
router.post('/Analyze', fileController.analyzeFile);
router.post('/Analyze/json', fileController.jsonResponse);

module.exports = router;

const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// Route to render the home page
router.get('/', fileController.renderHome);

// POST route to handle file uploads and perform analysis
router.post('/Analyze', fileController.analyzeFile);

module.exports = router;

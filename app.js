const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const indexRouter = require("./routes/index");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });
app.use(upload.single("textFile"));

// Use routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const fileService = require("../services/fileService");
const fs = require('fs');

exports.renderHome = (req, res) => {
    res.render("home", {
        value1: '0',
        value2: '0',
        value3: '0',
        value4: '0',
        value5: '0'
    });
};

exports.analyzeFile = (req, res) => {
    const filePath = req.file.path;

    fileService.analyzeFile(filePath, (err, result) => {
        if (err) {
            console.error("File Analyzing Failed");
            return res.send('Error analyzing file.');
        }

        res.render("home", {
            value1: result.totalLetters,
            value2: result.capitalLetters,
            value3: result.smallLetters,
            value4: result.vowels,
            value5: result.totalSpaces
        });

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error in Deleting:", err);
            }
        });
    });
};

const fs = require('fs');

exports.analyzeFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error in File Reading");
            return callback(err);
        }
        const result = analyzeText(data);
        callback(null, result);
    });
};

function analyzeText(text) {
    const result = {
        vowels: 0,
        capitalLetters: 0,
        smallLetters: 0,
        totalLetters: 0,
        totalSpaces: 0
    };

    const vowels = "AEIOUaeiou";

    for (let char of text) {
        if (vowels.includes(char)) {
            result.vowels++;
        }
        if (char >= 'A' && char <= 'Z') {
            result.capitalLetters++;
            result.totalLetters++;
        } else if (char >= 'a' && char <= 'z') {
            result.smallLetters++;
            result.totalLetters++;
        } else if (char === ' ') {
            result.totalSpaces++;
        }
    }
    return result;
}

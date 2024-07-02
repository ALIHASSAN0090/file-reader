const fs = require('fs');

function analyzeFile(filePath, word) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error in File Reading", err);
                reject(err);
                return;
            }

            const result = analyzeText(data, word);
            resolve(result);
        });
    });
}

function analyzeText(text, word) {
    const result = {
        vowels: 0,
        capitalLetters: 0,
        smallLetters: 0,
        totalLetters: 0,
        totalSpaces: 0,
        wordCount: 0
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

    const textArray = text.split(" ");
    if (word) {
        textArray.forEach(wordInText => {
            if (wordInText.includes(word)) {
                result.wordCount++;
            }
        });
    }

    return result;
}

module.exports = { analyzeFile };

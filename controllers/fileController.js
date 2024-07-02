const { Worker } = require('worker_threads');
const path = require('path');

exports.renderHome = (req, res) => {
    res.render("home", {
        value1: '0',
        value2: '0',
        value3: '0',
        value4: '0',
        value5: '0',
        value6: '0'
    });
};

function analyzeFileWithWorker(filePath, word, callback) {
    const workerPath = path.resolve(__dirname, '../services/fileWorker.js');

    const worker = new Worker(workerPath, {
        workerData: { filePath, word }
    });

    worker.on('message', (message) => {
        if (message.result) {
            callback(null, message.result);
        } else if (message.error) {
            callback(new Error(message.error));
        }
    });

    worker.on('error', (error) => {
        callback(error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            callback(new Error(`Worker stopped with exit code ${code}`));
        }
    });
}

exports.analyzeFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;
    const word = req.body.searchWord;

    analyzeFileWithWorker(filePath, word, (error, result) => {
        if (error) {
            console.error('Error processing file:', error);
            return res.status(500).send('Error processing file.');
        }
        res.render("home", {
            value1: result.totalLetters || '0',
            value2: result.capitalLetters || '0',
            value3: result.smallLetters || '0',
            value4: result.vowels || '0',
            value5: result.totalSpaces || '0',
            value6: result.wordCount || '0'
        });
    });
};

exports.jsonResponse = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;
    const word = req.body.searchWord;

    analyzeFileWithWorker(filePath, word, (error, result) => {
        if (error) {
            console.error('Error processing file:', error);
            return res.status(500).json({ error: 'Error processing file.' });
        }
        res.json(result);
    });
};

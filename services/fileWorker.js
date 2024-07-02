const { parentPort, workerData } = require('worker_threads');
const fileService = require('./fileService');

const { filePath, word } = workerData;

fileService.analyzeFile(filePath, word)
    .then(result => {
        parentPort.postMessage({ result });
    })
    .catch(error => {
        parentPort.postMessage({ error: error.message });
    });

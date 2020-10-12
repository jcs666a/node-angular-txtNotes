const express = require('express');
const apiControler = express.Router();
const path = require('path');
const fs = require('fs');
const endpoint = '/api/notes';
const txtDir = path.join(__dirname, 'txtDir');
const { getFileNameDate, createFile } = require('./helpers');

apiControler.get(`${endpoint}/:id?`, async (req, res) => {
    const id = req.params.id;
    const files = [];
    let status = 200;

    if(id) {
        try {
            const { fileName: fileNameA } = getFileNameDate(id);
            files.push({
                fileName: fileNameA,
                fileContent: fs.readFileSync(`${txtDir}/${id}`, 'utf8')
            });
        } catch (err) {
            // console.log(err);
            status = 500;
        }
    } else {
        fs.readdirSync(txtDir).forEach(file => {
            const { fileName, fileDate } = getFileNameDate(file);
            files.push({
                fileName,
                fileDate,
                key: file
            });
        });
    }

    res.status(status).send({
        files
    });
});

apiControler.post(`${endpoint}`, async (req, res) => {
    const { title, content } = req.body;
    createFile(res, title, content);
});

apiControler.put(`${endpoint}/:id?`, async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    try {
        fs.unlinkSync(`${txtDir}/${id}`);
        createFile(res, title, content);
    } catch(err) {
        res.status(500).send({status: err});
    }
});

apiControler.delete(`${endpoint}/:id?`, async (req, res) => {
    const id = req.params.id;
    try {
        fs.unlinkSync(`${txtDir}/${id}`);
        res.status(200).send({status: 'ok'});
    } catch(err) {
        res.status(500).send({status: err});
    }
});

module.exports = apiControler;

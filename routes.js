const express = require('express');
const apiControler = express.Router();
const path = require('path');
const fs = require('fs');

const endpoint = '/api/notes';
const txtDir = path.join(__dirname, 'txtDir');

// id, combinación de timestamp + titulo en base64

apiControler.get(`${endpoint}/:id?`, async (req, res) => {
    const id = req.params.id;
    const files = [];
    let status = 200;

    if(id) {
        try {
            files.push(fs.readFileSync(`${txtDir}/${id}.txt`, 'utf8'));
        } catch (err) {
            // console.log(err);
            status = 500;
        }
    } else {
        fs.readdirSync(txtDir).forEach(file => {
            files.push(file);
        });
    }

    res.status(status).send({
        files
    });
});

apiControler.post(`${endpoint}`, async (req, res) => {
    const {
        title, content
    } = req.body;

    console.log(title, content);
    res.status(200).send({status: 'ok'});
});

apiControler.put(`${endpoint}/:id?`, async (req, res) => {
    const id = req.params.id;
    console.log('put: ', id);

    res.status(200).send({status: 'ok'});
});

apiControler.delete(`${endpoint}/:id?`, async (req, res) => {
    const id = req.params.id;
    console.log('delete: ', id);

    res.status(200).send({status: 'ok'});
});

module.exports = apiControler;

const path = require('path');
const moment = require('moment');
const fs = require('fs');

const getFileNameDate = file => {
    const fileData = file.split('.')[0].split('_');
    const fileNameBuff = Buffer.from(fileData[1], 'base64');
    const fileName = fileNameBuff.toString('utf8');
    const date = new Date(parseFloat(fileData[0]));
    const fileDate = moment(date).format('MMM Do h:mma');

    return {
        fileName,
        fileDate
    };
};

const setFileName = title => {
    const buff = Buffer.from(title);
    const base64data = buff.toString('base64');
    return `${moment().format('x')}_${base64data}.txt`
};

const createFile = (res, title, content) => {
    const txtDir = path.join(__dirname, 'txtDir');
    const fileName = `${txtDir}/${setFileName(title)}`;
    fs.writeFile(fileName, content, 'utf8', function (err, data) {
        if(err) {
          res.status(500).send({status: err});
        }
        res.status(200).send({status: 'ok'});
    });
};

module.exports = {
    getFileNameDate,
    setFileName,
    createFile
};

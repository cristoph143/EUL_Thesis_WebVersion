var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
const FileController = require('../controller/file');
const File = require('../models/file');
const research = require('../models/research');

const {
    body
} = require('express-validator');
const {
    validationResult
} = require('express-validator');

var store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


var upload = multer({
    storage: store
}).single('file');

_router.get('/getResearchFile/:research_id', FileController.getResearchFile);

_router.get('/download/:research_id', async function(req, res, next) {
    // get research file using research_id
    const research_id = req.params.research_id;
    console.log(research_id)
    try {
        const result = await File.getResearchFile(research_id);
        console.log('result' + result)
            // convert result object to string
        const resultString = JSON.stringify(result);
        console.log('resultString' + resultString)
            // extract file value in resultString
        const fileValue = resultString.match(/(?<=file":")[^"]*/);
        console.log('fileValue' + fileValue)
        filepath = path.join(__dirname, '../uploads') + '\\' + fileValue;
        res.download(filepath);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
/*
req: file
res: originalname, uploadname
*/
_router.post('/upload-file/:id',
    function(req, res, next) {
        upload(req, res, async function(err) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(500).json({
                    tokens: null,
                    error: errors.array()
                });
            }

            const research_id = req.params.id;
            const originalname = req.file.originalname;

            try {
                const FileDetails = {
                    research_id: research_id,
                    originalname: originalname,
                };

                // call checkDuplicate method
                const checkDuplicate = await research.checkResearchId(research_id);
                if (checkDuplicate == 0) {
                    return res.status(500).json({
                        tokens: null,
                        error: 'Research ID not found'
                    });
                }

                const result = File.addResearchFile(FileDetails);

                res.status(201).json({
                    message: 'File uploaded!'
                });
            } catch (err) {

                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        })
    }
);
module.exports = _router;
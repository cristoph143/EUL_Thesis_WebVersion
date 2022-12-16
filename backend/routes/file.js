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
            // convert result string to json
            // res.status(200).json(result);
            // console.log(__dirname)
        filepath = path.join(__dirname, '../uploads') + '\\' + fileValue;
        res.download(filepath);
        // console.log(filepath);
        // res.sendFile(filepath);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// _router.post('/download/:filename', function(req, res, next) {
//     filepath = path.join(__dirname, '../uploads') + '/' + req.params.filename;
//     res.download(filepath);
//     console.log(filepath);
//     res.sendFile(filepath);
// });

/*
req: file
res: originalname, uploadname
*/
_router.post('/upload-file/:id',
    function(req, res, next) {
        upload(req, res, async function(err) {
            const errors = validationResult(req);
            console.log(errors.result)

            console.log('controller auth')

            if (!errors.isEmpty()) {
                return res.status(500).json({
                    tokens: null,
                    error: errors.array()
                });
            }

            const research_id = req.params.id;
            const originalname = req.file.originalname;

            console.log(research_id + ' --' + originalname)

            console.log('controller auth aft')
            try {

                console.log('controller auth try')

                const FileDetails = {
                    research_id: research_id,
                    originalname: originalname,
                };

                // call checkDuplicate method
                const checkDuplicate = await research.checkResearchId(research_id);
                console.log(checkDuplicate + 's')
                if (checkDuplicate == 0) {
                    return res.status(500).json({
                        tokens: null,
                        error: 'Research ID not found'
                    });
                }

                const result = File.addResearchFile(FileDetails);

                console.log("kkkak" + result);
                res.status(201).json({
                    message: 'File uploaded!'
                });
            } catch (err) {

                console.log('controller auth catch')

                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        })
    }
);
module.exports = _router;
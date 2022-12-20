var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var account = require('../models/account');
var File = require('../models/file');
const FileController = require('../controller/file');

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

_router.post('/upload-avatar/:id', function(req, res, next) {
    upload(req, res, async function(err) {
        const errors = validationResult(req);
        console.log(errors.result)
        console.log(req.file.originalname, "req.file.originalname")
        console.log('controller auth')

        if (!errors.isEmpty()) {
            return res.status(500).json({
                tokens: null,
                error: errors.array()
            });
        }

        const school_id = req.params.id;
        const originalname = req.file.originalname;

        console.log(school_id + ' --' + originalname)

        console.log('controller auth aft')
        try {

            console.log('controller auth try')

            const FileDetails = {
                school_id: school_id,
                originalname: originalname,
            };

            // call checkDuplicate method
            const checkDuplicate = await account.checkSchoolId(school_id);
            console.log(checkDuplicate + 's')
            if (checkDuplicate == 0) {
                return res.status(500).json({
                    tokens: null,
                    error: 'School ID not found'
                });
            }

            const result = File.addUserProfile(FileDetails);

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
});

_router.get('/getProfile/:school_id', FileController.getProfile);


_router.get('/download/:school_id', async function(req, res, next) {
    // get research file using school_id
    const school_id = req.params.school_id;
    console.log(school_id + "ss")
    try {
        console.log(school_id + "ss")
        const result = await File.getProfile(school_id);
        console.log('result' + result)
            // convert result object to string
        const resultString = JSON.stringify(result);
        console.log('resultString' + resultString)
            // extract file value in resultString
        const fileValue = resultString.match(/(?<=image":")[^"]*/);
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

module.exports = _router;
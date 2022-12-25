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

        if (!errors.isEmpty()) {
            return res.status(500).json({
                tokens: null,
                error: errors.array()
            });
        }

        const school_id = req.params.id;
        const originalname = req.file.originalname;

        try {
            const FileDetails = {
                school_id: school_id,
                originalname: originalname,
            };

            // call checkDuplicate method
            const checkDuplicate = await account.checkSchoolId(school_id);
            if (checkDuplicate == 0) {
                return res.status(500).json({
                    tokens: null,
                    error: 'School ID not found'
                });
            }

            const result = File.addUserProfile(FileDetails);

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
});

_router.get('/getProfile/:school_id', FileController.getProfile);

_router.get('/download/:school_id', async function(req, res, next) {
    // get research file using school_id
    const school_id = req.params.school_id;
    try {
        const result = await File.getProfile(school_id);
        // convert result object to string
        const resultString = JSON.stringify(result);
        // extract file value in resultString
        const fileValue = resultString.match(/(?<=image":")[^"]*/);
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
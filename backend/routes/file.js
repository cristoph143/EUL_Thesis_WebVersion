var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');


var store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


var upload = multer({ storage: store }).single('file');

/*
req: file
res: originalname, uploadname
*/
_router.post('/upload-file/:id', function(req, res, next) {
    // get the research_id
    // const research_id = req.body.research_id;
    // console.log(req.file.research_id);
    // print the destination of the research
    // console.log(req.file.destination);
    upload(req, res, function(err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        //do all database record saving activity
        return res.json({ originalname: req.file.originalname, uploadname: req.file.filename, research_id: req.params.id });
    });
});
module.exports = _router;
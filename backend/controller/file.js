exports.upload(req, res, function(err) {
    if (err) {
        return res.status(501).json({ error: err });
    }
    //do all database record saving activity
    return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
});
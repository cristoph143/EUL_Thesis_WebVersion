const {
    validationResult
} = require('express-validator');

exports.addResearchFile = async(req, res, next) => {
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

    console.log(research_id + ' --' + originalname + " --" + url);

    console.log('controller auth aft')

    try {

        console.log('controller auth try')

        const FileDetails = {
            research_id: research_id,
            originalname: originalname
        };

        const result = await File.addResearchFile(FileDetails);

        console.log(result.values());
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
}
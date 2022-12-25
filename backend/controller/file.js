const {
    validationResult
} = require('express-validator');
const File = require('./../models/file');

// getResearchFile
exports.getResearchFile = async(req, res, next) => {
    const research_id = req.params.research_id;
    try {
        const result = await File.getResearchFile(research_id);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// getProfile
exports.getProfile = async(req, res, next) => {
    const school_id = req.params.school_id;
    try {
        const result = await File.getProfile(school_id);
        return res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
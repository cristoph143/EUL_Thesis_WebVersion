const { validationResult } = require('express-validator');

const account = require('../models/account');


exports.fetchAll = async(req, res, next) => {
    try {
        const result = await account.fetchAll();
        console.log('result' + result)
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
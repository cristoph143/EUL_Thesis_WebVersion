const {
    validationResult
} = require('express-validator');

const account = require('../models/account');
const bcrypt = require('bcryptjs');

exports.fetchAll = async(req, res, next) => {
    try {
        const result = await account.fetchAll();
        // console.log('result' + result)
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// fetch account using schhol_id except password
exports.fetchAccountBySchoolID = async(req, res, next) => {
    const school_id = req.params.school_id;
    console.log(school_id)
    try {
        const result = await account.getUserInfoExceptPassword(school_id);
        console.log('result' + result)
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            res.status(500).json(err);
        }
        next(err);
    }
}

// find by email
exports.findAccountByEmail = async(req, res, next) => {
    const email = req.params.email;
    console.log(email)
    try {
        const result = await account.findAccountByEmail(email);
        console.log('result' + result)
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            res.status(500).json(err);
        }
        next(err);
    }
}

// get all roles
exports.getRoles = async(req, res, next) => {
    console.log('controller role')
    try {
        const result = await account.getRoles();
        console.log('result' + result)
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// get all departments
exports.getDepartments = async(req, res, next) => {
    console.log('controller department')
    try {
        const result = await account.getDepartments();
        console.log('result' + result)
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
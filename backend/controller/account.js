const {
    validationResult
} = require('express-validator');

const account = require('../models/account');
const bcrypt = require('bcryptjs');

exports.fetchAll = async(req, res, next) => {
    try {
        const result = await account.fetchAll();
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
    try {
        const result = await account.getUserInfoExceptPassword(school_id);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            res.status(500).json(err);
        }
        next(err);
    }
}

// update account
exports.updateAccountBySchoolID = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json({
            tokens: null,
            error: errors.array()
        });
    }

    const school_id = req.params.school_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const role_roleID = req.body.role_roleID;
    const departmentID = req.body.departmentID;

    try {
        const AccountDetails = {
            school_id: school_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            role_roleID: role_roleID,
            departmentID: departmentID
        };

        const result = await account.updateAccount(AccountDetails);

        res.status(201).json({
            message: 'Account updated!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            res.status(500).json({
                message: 'Account updated failed!'
            });
        }
        next(err);
    }
}


// find by email
exports.findAccountByEmail = async(req, res, next) => {
    const email = req.params.email;
    try {
        const result = await account.findAccountByEmail(email);
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
    try {
        const result = await account.getRoles();
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
    try {
        const result = await account.getDepartments();
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// confirm password using school_id and password
exports.confirmPassword = async(req, res, next) => {
    const school_id = req.body.school_id;
    const password = req.body.password
    try {
        // get password from database using school_id
        const result = await account.getPassword(school_id);
        // extract result object into string
        const passwordFromDB = JSON.stringify(result[0]);
        // extract passwordFromDB value
        const passwordFromDBValue = passwordFromDB.split(":")[1];
        // remove last two characters
        const passwordFromDBValueTrimmed = passwordFromDBValue.substring(0, passwordFromDBValue.length - 2);
        // remove quotation characters
        const passwordFromDBValueTrimmedQuotation = passwordFromDBValueTrimmed.substring(1, passwordFromDBValueTrimmed.length - 1);
        // compare password from database and password from request
        const isEqual = await bcrypt.compare(password, passwordFromDBValueTrimmedQuotation);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({
            message: 'Password is correct'
        });
    } catch (err) {
        if (!err.statusCode) {
            res.status(500).json({
                message: 'Password is incorrect'
            })
        }
        next(err);
    }
}

exports.getAllSpecificRole = async(req, res, next) => {
    const role = req.params.role;
    try {
        const result = await account.getAllSpecificRole(role);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// getNumofUser
exports.getNumOfUser = async(req, res, next) => {
    const role = req.params.role;
    try {
        const result = await account.getNumOfUser(role);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// deleteAccountBySchoolID
exports.deleteAccountBySchoolID = async(req, res, next) => {
    const school_id = req.params.school_id;
    try {
        const result = await account.deleteAccountBySchoolID(school_id);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
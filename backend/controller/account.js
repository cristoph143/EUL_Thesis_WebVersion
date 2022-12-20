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

// update account
exports.updateAccountBySchoolID = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.result)

    // school_id, first_name, last_name, email, role_roleID, departmentID
    console.log('controller auth')

    if (!errors.isEmpty()) {
        return res.status(500).json({
            tokens: null,
            error: errors.array()
        });
    }

    // school_id, first_name, last_name, email, role_roleID, departmentID
    const school_id = req.params.school_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const role_roleID = req.body.role_roleID;
    const departmentID = req.body.departmentID;

    console.log('controller auth aft')
    try {

        console.log('controller auth try')

        const AccountDetails = {
            school_id: school_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            role_roleID: role_roleID,
            departmentID: departmentID
        };

        const result = await account.updateAccount(AccountDetails);

        console.log(result.values());
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

// confirm password using school_id and password
exports.confirmPassword = async(req, res, next) => {
    const school_id = req.body.school_id;
    const password = req.body.password
    console.log(school_id)
    console.log(password)
    try {
        // get password from database using school_id
        const result = await account.getPassword(school_id);
        // extract result object into string
        const passwordFromDB = JSON.stringify(result[0]);
        console.log(passwordFromDB)
            // extract passwordFromDB value
        const passwordFromDBValue = passwordFromDB.split(":")[1];
        // remove last two characters
        const passwordFromDBValueTrimmed = passwordFromDBValue.substring(0, passwordFromDBValue.length - 2);
        // remove quotation characters
        const passwordFromDBValueTrimmedQuotation = passwordFromDBValueTrimmed.substring(1, passwordFromDBValueTrimmed.length - 1);
        console.log(passwordFromDBValueTrimmedQuotation)
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
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

// update account profile
exports.updateAccountProfile = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.result)

    // school_id, first_name, last_name, email, department, image, password
    console.log('controller auth')

    if (!errors.isEmpty()) {
        return res.status(500).json({
            tokens: null,
            error: errors.array()
        });
    }

    const school_id = req.body.school_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const department = req.body.department;
    const password = req.body.password;
    const role = req.body.role;

    console.log('controller auth aft')
    try {

        // get password from account.js
        const stored_password = await account.getPassword(school_id);

        console.log("Stored")
        console.log(stored_password[0][0].password)

        // decrypt the hashedPassword
        const isEqual = await bcrypt.compare(password, stored_password[0][0].password);
        console.log(isEqual)

        if (!isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }

        const AccountDetails = {
            school_id: school_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            department: department,
            roles: role,
        };
        console.log(AccountDetails);

        const result = await account.updateAccountProfile(AccountDetails);
        console.log(result)

        console.log(result.values());
        res.status(201).json({
            message: 'Account Updated!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = err.message
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
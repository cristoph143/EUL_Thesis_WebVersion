const {
    validationResult
} = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Account = require('../models/account');

exports.signup = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json({
            tokens: null,
            error: errors.array()
        });
    }

    const school_id = req.body.school_id;
    const role_roleID = req.body.role_roleID;
    const departmentID = req.body.departmentID;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const approve = req.body.approve;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const AccountDetails = {
            school_id: school_id,
            role_roleID: role_roleID,
            departmentID: departmentID,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            approve: approve
        };

        const result = await Account.createAccount(AccountDetails);

        res.status(201).json({
            message: 'Account registered!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            res.status(500).json({
                err
            });
        }
        next(err);
    }
};

exports.login = async(req, res, next) => {
    const school_id = req.body.school_id;
    const password = req.body.password;
    try {
        const user = await Account.findBySchoolID(school_id);

        if (user[0].length !== 1) {
            const error = new Error('A user with this school_id could not be found.');
            error.statusCode = 401;
            throw error;
        }

        // extract approve value from user
        const approve = user[0][0].approve;

        const storedUser = user[0][0];

        const isEqual = await bcrypt.compare(password, storedUser.password);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        // getRoles
        const roles = await Account.getRoles(school_id);
        // iterate roles to match current role_roleID to roles[0][i].roleID
        let role = '';
        for (let i = 0; i < roles[0].length; i++) {
            console.log(roles[0][i].roleID)
            if (roles[0][i].roleID === storedUser.role_roleID) {
                role = roles[0][i].roleName;
                break;
            }
        }

        const token = jwt.sign({
                email: storedUser.email,
                school_id: storedUser.school_id,
                role: role,
                approve: storedUser.approve,
                // expiresIn in minutes format
                expiresIn: '1h'
            },
            'secretfortoken', {
                expiresIn: '1h'
            }
        );
        res.status(200).json({
            token: token,
            userId: storedUser.school_id,
            role: storedUser.role_roleID,
            approve: storedUser.approve
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            res.status(500).json({
                err
            });
        }
        next(err);
    }
};
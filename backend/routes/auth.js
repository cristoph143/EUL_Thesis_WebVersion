const express = require('express');

const {
    body
} = require('express-validator');

const router = express.Router();

const Account = require('../models/account');

const authController = require('../controller/auth');

router.post(
    '/signup', [
        body('school_id')
        .custom(async(school_id) => {
            const account = await Account.findBySchoolID(school_id);
            if (account[0].length > 0) {
                return Promise.reject('SchoolId already exist!');
            }
        }),
        body('role_roleID'),
        body('departmentID'),
        body('first_name').trim().not().isEmpty(),
        body('last_name').trim().not().isEmpty(),
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async(email) => {
            const account = await Account.findAccountByEmail(email);
            console.log(account[0].length)
            if (account[0].length > 0) {
                return Promise.reject('Email address already exist!');
            }
        }).normalizeEmail(),
        body('password').trim().not().isEmpty(),
        body('approve')
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;
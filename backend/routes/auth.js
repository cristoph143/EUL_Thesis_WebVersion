const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const Account = require('../models/account');

const authController = require('../controller/auth');

router.post(
    '/signup', [
        // school_id, first_name, last_name, email, department, image, password, approve
        body('school_id')
        .custom(async(school_id) => {
            const account = await Account.findBySchoolID(school_id);
            if (account[0].length > 0) {
                return Promise.reject('SchoolId already exist!');
            }
        }),
        body('first_name').trim().not().isEmpty(),
        body('last_name').trim().not().isEmpty(),
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async(email) => {
            const account = await Account.findByEmail(email);
            if (account[0].length > 0) {
                return Promise.reject('Email address already exist!');
            }
        }).normalizeEmail(),
        body('department').trim().not().isEmpty(),
        body('image').trim().not().isEmpty(),
        body('password').trim().not().isEmpty(),

        body('approve'),
    ],

    authController.signup
);

// router.post('/login', authController.login);

module.exports = router;
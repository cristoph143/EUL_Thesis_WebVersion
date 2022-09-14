const express = require('express');

const { body } = require('express-validator');

const accountController = require('../controller/account');

const router = express.Router();
console.log('roueter')

router.get('/', accountController.fetchAll);
router.post(
    '/update', [
        // school_id, first_name, last_name, email, department, image, password
        body('school_id').trim().not().isEmpty(),
        body('first_name').trim().not().isEmpty(),
        body('last_name').trim().not().isEmpty(),
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail(),
        body('department').trim().not().isEmpty(),
        body('image').trim().not().isEmpty(),
        body('password').trim().not().isEmpty(),

    ],
    accountController.updateAccountProfile
)

router.get('/department/:department', accountController.fetchAllByDepartment);

module.exports = router;
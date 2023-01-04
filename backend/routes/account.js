const express = require('express');

const {
    body
} = require('express-validator');

const accountController = require('../controller/account');

const router = express.Router();
console.log('roueter')

router.get('/', accountController.fetchAll);
router.get('/roles', accountController.getRoles);
router.get('/departments', accountController.getDepartments);
router.get('/:school_id', accountController.fetchAccountBySchoolID);
router.post('/confirm', [
        body('school_id').trim().not().isEmpty(),
        body('password').trim().not().isEmpty()
    ],
    accountController.confirmPassword);
router.post('/update/:school_id', [
    body('first_name').trim().not().isEmpty(),
    body('last_name').trim().not().isEmpty(),
    body('email').trim().not().isEmpty(),
    body('role_roleID').trim().not().isEmpty(),
    body('departmentID').trim().not().isEmpty(),
], accountController.updateAccountBySchoolID);

router.get('/role/:role', accountController.getAllSpecificRole);
router.get('/num_of_user/:role', accountController.getNumOfUser);
// delete account
router.delete('/deleteSchoolID/:school_id', accountController.deleteAccountBySchoolID);
// edit account where input is optional
router.put('/editSchoolID/:school_id', [
    body('school_id').trim().not().isEmpty(),
    body('first_name').trim().not().isEmpty(),
    body('last_name').trim().not().isEmpty(),
    body('email').trim().not().isEmpty(),
    body('role_roleID').trim().not().isEmpty(),
    body('departmentID').trim().not().isEmpty(),
    body('approve').trim().not().isEmpty(),
], accountController.editAccountBySchoolID);
module.exports = router;
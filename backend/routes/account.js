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
module.exports = router;
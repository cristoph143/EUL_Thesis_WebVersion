const express = require('express');

const accountController = require('../controller/account');

const router = express.Router();

// fetch all accounts from Account
router.get('/', accountController.fetchAllAccounts);

// fetch account using school_id
router.get('/:school_id', accountController.fetchAccountBySchoolId);

// fetch name using name
router.get('/name/:name', accountController.fetchAccountByName);

// login using email and password
router.get('/login/:email/:password', accountController.login);

// get password using email
router.get('/password/:email', accountController.getPassword);

// Post

// create new account
router.post('/', accountController.createAccount);

// Update

// update profile using school_id
router.put('/:school_id', accountController.updateProfile);

// Delete

// detele account using
router.delete('/:school_id', accountController.deleteAccountBySchoolId);

module.exports = router;
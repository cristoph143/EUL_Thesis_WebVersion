const express = require('express');

const pendingController = require('../controller/pending');

const router = express.Router();

// Fetch

// fetch all accounts from Account
router.get('/', pendingController.fetchAllAccounts);

// fetch account using school_id
router.get('/:school_id', pendingController.fetchAccountBySchoolId);

// Post

// create a new account
router.post('/', pendingController.createAccount);

// Update

// Update role using school_id and role
router.put('/:school_id', pendingController.updateRole);

// Update approve using school_id and approve
router.put('/approve/:school_id', pendingController.updateApprove);

//Delete

// Delete user when approve is true
router.delete('/:school_id', pendingController.deleteAccount);

module.exports = router;
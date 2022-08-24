const Pending = require('../models/pending');

// Fetch

// fetch all accounts from Pending_Account
exports.fetchAllAccounts = async(req, res, next) => {
    try {
        const accounts = await Pending.fetchAll();
        res.status(200).json({
            message: 'Fetched all accounts',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching all accounts failed'
        });
    }
}


// fetch account using school_id
exports.fetchAccountBySchoolId = async(req, res, next) => {
    try {
        const school_id = req.params.school_id;
        const accounts = await Pending.fetchBySchoolId(school_id);
        res.status(200).json({
            message: 'Fetched account by school_id',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching account by school_id failed'
        });
    }
}

// Post

// create a new account
exports.createAccount = async(req, res, next) => {
    try {
        const email = req.body.email;
        const school_id = req.body.school_id;
        const role = req.body.role;
        const approve = req.body.approve;
        const account = await Pending.create(email, school_id, role, approve);
        res.status(200).json({
            message: 'Created account',
            account: account
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Creating account failed'
        });
    }
}

// Update

// Update role using school_id and role
exports.updateRole = async(req, res, next) => {
    try {
        const school_id = req.params.school_id;
        const role = req.params.role;
        const accounts = await Pending.updateRole(school_id, role);
        res.status(200).json({
            message: 'Updated role',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Updating role failed'
        });
    }
}


// Update approve using school_id and approve
exports.updateApprove = async(req, res, next) => {
    try {
        const school_id = req.params.school_id;
        const approve = req.params.approve;
        const accounts = await Pending.updateApprove(school_id, approve);
        res.status(200).json({
            message: 'Updated approve',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Updating approve failed'
        });
    }
}


//Delete

// Delete user when approve is true
exports.deleteAccount = async(req, res, next) => {
    try {
        const school_id = req.params.school_id;
        const accounts = await Pending.deleteAccount(school_id);
        res.status(200).json({
            message: 'Deleted account',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Deleting account failed'
        });
    }
}
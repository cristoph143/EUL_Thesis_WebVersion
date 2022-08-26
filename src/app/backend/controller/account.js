const Account = require('../models/account');

// fetch all accounts from Account
exports.fetchAllAccounts = async(req, res, next) => {
    try {
        const accounts = await Account.fetchAll();
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
        const accounts = await Account.fetchBySchoolId(school_id);
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


// fetch name using name
exports.fetchAccountByName = async(req, res, next) => {
    try {
        const name = req.params.name;
        const accounts = await Account.fetchName(name);
        res.status(200).json({
            message: 'Fetched account by name',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching account by name failed'
        });
    }
}


// login using email and password
exports.login = async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const accounts = await Account.login(email, password);
        // if email and password dont match, return error
        if (accounts.email != email && accounts.password != password) {
            res.status(401).json({
                message: 'Email or password is incorrect'
            });
        } else {
            res.status(200).json({
                message: 'Logged in',
                accounts: accounts
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Logging in failed'
        });
    }
}


// get password using email
exports.getPassword = async(req, res, next) => {
    try {
        const email = req.params.email;
        const accounts = await Account.getPassword(email);
        res.status(200).json({
            message: 'Fetched password',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching password failed'
        });
    }
}


// Post

// create new account
exports.createAccount = async(req, res, next) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const department = req.body.department;
        const school_id = req.body.school_id;
        const image = req.body.image;
        const password = req.body.password;
        const role = req.body.role;
        // research_list as empty array
        const research = req.body.research;
        const accounts = await Account.create(email, name, department, school_id, image, password, role);
        // if email exist and school_id exist, return error
        if (accounts.email == email && accounts.school_id == school_id) {
            res.status(409).json({
                message: 'Email and school_id already exist'
            });
        } else {
            res.status(200).json({
                message: 'Created account',
                accounts: accounts
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Creating account failed'
        });
    }
}


// Update

// update profile using school_id
exports.updateProfile = async(req, res, next) => {
    try {
        const school_id = req.params.school_id;
        const name = req.body.name;
        const department = req.body.department;
        const image = req.body.image;
        const accounts = await Account.updateProfile(school_id, name, department, image);
        res.status(200).json({
            message: 'Updated profile',
            accounts: accounts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Updating profile failed'
        });
    }
}


// Delete

// delete account using 
exports.deleteAccountBySchoolId = async(req, res, next) => {
    try {
        const school_id = req.params.school_id;
        const accounts = await Account.deleteBySchoolId(school_id);
        // if school_id doesn't exist, return error
        if (accounts.school_id != school_id) {
            res.status(404).json({
                message: 'School_id not found'
            });
        } else {
            res.status(200).json({
                message: 'Deleted account',
                accounts: accounts
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Deleting account failed'
        });
    }
};
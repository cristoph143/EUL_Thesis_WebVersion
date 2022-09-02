const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Account = require('../models/account');

exports.signup = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.result)

    // school_id, first_name, last_name, email, department, image, password
    console.log('controller auth')

    if (!errors.isEmpty()) {
        return res.status(500).json({ tokens: null, error: errors.array() });
    }

    const school_id = req.body.school_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const department = req.body.department;
    const image = req.body.image;
    const password = req.body.password;

    console.log('controller auth aft')
    try {

        console.log('controller auth try')
        const hashedPassword = await bcrypt.hash(password, 12);

        const AccountDetails = {
            school_id: school_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            department: department,
            image: image,
            password: hashedPassword,
        };

        const result = await Account.createAccount(AccountDetails);

        console.log(result.values());
        res.status(201).json({ message: 'Account registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// exports.login = async(req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try {
//         const user = await Account.find(email);

//         if (user[0].length !== 1) {
//             const error = new Error('A user with this email could not be found.');
//             error.statusCode = 401;
//             throw error;
//         }

//         const storedUser = user[0][0];

//         const isEqual = await bcrypt.compare(password, storedUser.password);

//         if (!isEqual) {
//             const error = new Error('Wrong password!');
//             error.statusCode = 401;
//             throw error;
//         }

//         const token = jwt.sign({
//                 email: storedUser.email,
//                 userId: storedUser.id,
//             },
//             'secretfortoken', { expiresIn: '1h' }
//         );
//         res.status(200).json({ token: token, userId: storedUser.id });
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     }
// };
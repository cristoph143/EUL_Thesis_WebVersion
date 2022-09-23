const db = require('../util/database');

module.exports = class Account {
    constructor(email, first_name, last_name, department, school_id, password, role) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.department = department;
        this.school_id = school_id;
        this.image = image;
        this.password = password;
        this.role = role;
        this.approve = null;
    }

    // sequence school_id, first_name, last_name, email, department, image, password, role

    // Post

    // create new account with school_id, first_name, last_name, email, department, image, password
    static createAccount(account) {
        return db.execute(
            'INSERT INTO account (school_id, first_name, last_name, email, department, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [account.school_id, account.first_name, account.last_name, account.email, account.department, account.password, account.role]
        );
    }


    static findBySchoolID(school_id) {
        return db.execute(
            'SELECT * FROM account WHERE school_id = ?', [school_id]
        );
    }

    static findByEmail(email) {
        return db.execute(
            'SELECT * FROM account WHERE email = ?', [email]
        );
    }

    static fetchAll() {
        return db.execute(
            'SELECT * FROM account'
        );
    }

    // update account profile
    static updateAccountProfile(account) {
        return db.execute(
            'UPDATE account SET first_name = ?, last_name = ?, email = ?, department = ?, role = ? WHERE school_id = ?', [account.first_name, account.last_name, account.email, account.department, account.school_id, account.role]
        );
    }

    // delete account profile
    static deleteAccountProfile(account) {
        return db.execute(
            'DELETE FROM account WHERE school_id = ? AND password = ?', [account.school_id, account.password]
        );
    }

    // get all accounts using specific department
    static fetchAllByDepartment(department) {
        return db.execute(
            'SELECT * FROM account WHERE department = ?', [department]
        );
    }

    // get all accounts using specific role
    static fetchAllByRole(role) {
        return db.execute(
            'SELECT * FROM account WHERE role = ?', [role]
        );
    }

    // get all accounts using specific approve
    static fetchAllByApprove(approve) {
        return db.execute(
            'SELECT * FROM account WHERE approve = ?', [approve]
        );
    }

    // get all accounts using specific department and role
    static fetchAllByDepartmentAndRole(department, role) {
        return db.execute(
            'SELECT * FROM account WHERE department = ? AND role = ?', [department, role]
        );
    }

    // get all accounts using specific department and approve
    static fetchAllByDepartmentAndApprove(department, approve) {
        return db.execute(
            'SELECT * FROM account WHERE department = ? AND approve = ?', [department, approve]
        );
    }

    // get all accounts using specific role and approve
    static fetchAllByRoleAndApprove(role, approve) {
        return db.execute(
            'SELECT * FROM account WHERE role = ? AND approve = ?', [role, approve]
        );
    }

    // get all accounts using specific department, role and approve
    static fetchAllByDepartmentAndRoleAndApprove(department, role, approve) {
        return db.execute(
            'SELECT * FROM account WHERE department = ? AND role = ? AND approve = ?', [department, role, approve]
        );
    }

    // update password
    static updatePassword(account) {
        return db.execute(
            'UPDATE account SET password = ? WHERE school_id = ? AND password = ?', [account.new_password, account.school_id, account.password]
        );
    }

    // get password
    static getPassword(school_id) {
        return db.execute(
            'SELECT password FROM account WHERE school_id = ?', [school_id]
        );
    }

    // get user using school_id except password
    static getUserInfoExceptPassword(school_id) {
        return db.execute(
            'SELECT school_id, first_name, last_name, email, department, role, approve FROM account WHERE school_id = ?', [school_id]
        );
    }

    // get user using school_id or name and select the first_name, last_name, school_id, department and image  from account
    static getUserInfo(input) {
        return db.execute(
            'SELECT first_name, last_name, school_id, department, image FROM account WHERE school_id = ? OR first_name = ? OR last_name = ?', [input, input, input]
        );
    }
}
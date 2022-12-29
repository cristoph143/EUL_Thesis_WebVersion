const db = require('../util/database');

module.exports = class Account {
    constructor(school_id, role_roleID, departmentID, first_name, last_name, email, password, approve) {
        this.school_id = school_id;
        this.role_roleID = role_roleID;
        this.departmentID = departmentID;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.approve = approve;
    }

    // createAccount
    static createAccount(account) {
        return db.execute(
            'INSERT INTO account (school_id, role_roleID, departmentID, first_name, last_name, email, password, approve) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [account.school_id, account.role_roleID, account.departmentID, account.first_name, account.last_name, account.email, account.password, account.approve]
        );
    }

    static findBySchoolID(school_id) {
        return db.execute(
            'SELECT * FROM account WHERE school_id = ?', [school_id]
        );
    }

    // findAccountByEmail
    static findAccountByEmail(email) {
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
            "SELECT * FROM account " +
            "Left Join " +
            "role on role.roleID = account.role_roleID " +
            "Left Join " +
            "department on department.departmentID = account.departmentID " +
            "Left Join " +
            "user_profile on user_profile.school_id = account.school_id " +
            "where account.school_id = ?", [school_id]
        );
    }

    // update account
    static updateAccount(account) {
        return db.execute(
            // school_id, first_name, last_name, email, role_roleID, departmentID
            'UPDATE account SET first_name = ?, last_name = ?, email = ?, role_roleID = ?, departmentID = ? WHERE school_id = ?', [account.first_name, account.last_name, account.email, account.role_roleID, account.departmentID, account.school_id]
        );
    }

    // get all roles
    static getRoles() {
        return db.execute(
            'SELECT * FROM role'
        );
    }

    // get all departments
    static getDepartments() {
        return db.execute(
            'SELECT * FROM department'
        );
    }

    // getPassword
    static getPassword(school_id) {
        return db.execute(
            'SELECT password FROM account WHERE school_id = ?', [school_id]
        );
    }

    // check if school_id exists in the db
    static checkSchoolId(school_id) {
        return db.execute(
            'SELECT COUNT(*) FROM account WHERE school_id = ?', [school_id]
        );
    }

    // getAllChairmanRole
    static getAllSpecificRole(role) {
        return db.execute(
            "select account.school_id, account.first_name, account.last_name, account.email, account.approve, " +
            "role.*, department.* from account " +
            "left join role on role.roleID = account.role_roleID " +
            "left join department on department.departmentID = account.departmentID " +
            "where role.roleName = ?", [role]
        );
    }
}
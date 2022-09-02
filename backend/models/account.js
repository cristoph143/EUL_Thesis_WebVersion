const db = require('../util/database');

module.exports = class Account {
    constructor(email, first_name, last_name, department, school_id, image, password) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.department = department;
        this.school_id = school_id;
        this.image = image;
        this.password = password;
        this.role = null;
        this.research_list = [research_list];
        this.approve = 0;
    }

    // sequence school_id, first_name, last_name, email, department, image, password, role

    // Post

    // create new account with school_id, first_name, last_name, email, department, image, password
    static createAccount(account) {
        return db.execute(
            'INSERT INTO account (school_id, first_name, last_name, email, department, image, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [account.school_id, account.first_name, account.last_name, account.email, account.department, account.image, account.password]
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
};
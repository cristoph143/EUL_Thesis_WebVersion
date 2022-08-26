const db = require('../util/database');

module.exports = class Account {
    constructor(email, name, school_id, image, password, role) {
        this.email = email;
        this.name = name;
        this.department = department;
        this.school_id = school_id;
        this.image = image;
        this.password = password;
        this.role = role;
        this.research_list = [research_list];
    }

    // Fetch

    // fetch all accounts from Account
    static fetchAll() {
        return db.execute('SELECT * FROM Account');
    }

    // fetch account using school_id
    static fetchBySchoolId(school_id) {
        return db.execute('SELECT * FROM Account WHERE school_id = ?', [school_id]);
    }

    // fetch name using name
    static fetchName(name) {
        return db.execute('SELECT * FROM Account WHERE name = ?', [name]);
    }

    static login(email, password) {
        return db.execute('SELECT * FROM Account WHERE email = ? AND password = ?', [email, password]);
    }

    // get password using email
    static getPassword(email) {
        return db.execute('SELECT password FROM Account WHERE email = ?', [email]);
    }

    // Post

    // create new account
    static create(email, name, department, school_id, image, password, role) {
        return db.execute('INSERT INTO Account (email, name, department, school_id, image, password, role) VALUES (?, ?, ?, ?, ?, ?)', [email, name, department, school_id, image, password, role]);
    }

    // Update

    // update profile using school_id
    static updateProfile(school_id, image, name) {
        return db.execute('UPDATE Account SET image = ?, name = ? WHERE school_id = ?', [image, name, school_id]);
    }

    // Delete

    // delete account using school_id
    static delete(school_id) {
        return db.execute('DELETE FROM Account WHERE school_id = ?', [school_id]);
    }
};
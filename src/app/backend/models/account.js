const db = require('../util/database');

module.exports = class Account {
    constructor(id, email, name, school_id, image, password, role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.school_id = school_id;
        this.image = image;
        this.password = password;
        this.role = role;
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

    static login(email, password) {
        return db.execute('SELECT * FROM Account WHERE email = ? AND password = ?', [email, password]);
    }

    // Post

    // create new account
    static create(id, email, name, school_id, image, password, role) {
        return db.execute('INSERT INTO Account (id, email, name, school_id, image, password, role) VALUES (?, ?, ?, ?, ?, ?)', [id, email, name, school_id, image, password, role]);
    }

    // static post(item) {
    //     return db.execute('INSERT INTO groceries (item) VALUES (?)', [item]);
    // }

    // Update
    // static update(id, item) {
    //     return db.execute('UPDATE groceries SET item = ? WHERE id = ?', [item, id]);
    // }

    // Delete
    // static delete(id) {
    //     return db.execute('DELETE FROM groceries WHERE id = ?', [id]);
    // }
};
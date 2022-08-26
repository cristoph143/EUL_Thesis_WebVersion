const db = require('../util/database');

module.exports = class Pending_Account {
    constructor(email, school_id, role, approve) {
        this.email = email;
        this.school_id = school_id;
        this.role = role;
        this.approve = approve;
    }

    // Fetch

    // fetch all accounts from thesis.pending_user
    static fetchAll() {
        return db.execute('SELECT * FROM thesis.pending_user');
    }

    // fetch account using school_id
    static fetchBySchoolId(school_id) {
        return db.execute('SELECT * FROM thesis.pending_user WHERE school_id = ?', [school_id]);
    }

    // Post
    static create(email, school_id, role, approve) {
        return db.execute('INSERT INTO thesis.pending_user (email, school_id, role, approve) VALUES (?, ?, ?, ?)', [email, school_id, role, approve]);
    }

    // Update

    // Update role using school_id and role
    static updateRole(school_id, role) {
        return db.execute('UPDATE thesis.pending_user SET role = ? WHERE school_id = ?', [role, school_id]);
    }

    // Update approve using school_id and approve
    static updateApprove(school_id, approve) {
        return db.execute('UPDATE thesis.pending_user SET approve = ? WHERE school_id = ?', [approve, school_id]);
    }

    //Delete

    // Delete user when approve is true
    static delete(school_id, approve) {
        return db.execute('DELETE FROM thesis.pending_user WHERE school_id = ? AND approve = ?', [school_id, approve]);
    }

};
const db = require('../util/database');

module.exports = class Pending_Account {
    constructor(email, school_id, role, approve) {
        this.email = email;
        this.school_id = school_id;
        this.role = role;
        this.approve = approve;
    }

    // Fetch

    // fetch all accounts from Pending_Account
    static fetchAll() {
        return db.execute('SELECT * FROM Pending_Account');
    }

    // fetch account using school_id
    static fetchBySchoolId(school_id) {
        return db.execute('SELECT * FROM Pending_Account WHERE school_id = ?', [school_id]);
    }

    // Post
    static create(email, school_id, role, approve) {
        return db.execute('INSERT INTO Pending_Account (email, school_id, role, approve) VALUES (?, ?, ?, ?)', [email, school_id, role, approve]);
    }

    // Update

    // Update role using school_id and role
    static updateRole(school_id, role) {
        return db.execute('UPDATE Pending_Account SET role = ? WHERE school_id = ?', [role, school_id]);
    }

    // Update approve using school_id and approve
    static updateApprove(school_id, approve) {
        return db.execute('UPDATE Pending_Account SET approve = ? WHERE school_id = ?', [approve, school_id]);
    }

    //Delete

    // Delete user when approve is true
    static delete(school_id, approve) {
        return db.execute('DELETE FROM Pending_Account WHERE school_id = ? AND approve = ?', [school_id, approve]);
    }

};
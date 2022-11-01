const db = require('../util/database');

module.exports = class AuthoredList {
    constructor(research_id, author_id) {
        this.research_id = research_id;
        this.author_id = author_id;
    }

    // add author details
    static addAuthored(author) {
        return db.execute(
            'INSERT INTO authored (research_id, school_id) VALUES (?, ?)', [author.research_id, author.school_id]
        );
    }

    // add research_list
    static addResearchList(author) {
        return db.execute(
            'INSERT INTO research_list (research_id, school_id) VALUES (?, ?)', [author.research_id, author.school_id]
        );
    }
}
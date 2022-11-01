const db = require('../util/database');
const account = require('../models/account');
module.exports = class Research {
    constructor(
        research_id, topic_category, sdg_category, date_published, adviser,
        department, keywords, title, abstract, qr, number_of_views
    ) {
        this.research_id = research_id;
        this.topic_category = topic_category;
        this.sdg_category = sdg_category;
        this.date_published = date_published;
        this.adviser = adviser;
        this.department = department;
        this.keywords = keywords;
        this.title = title;
        this.abstract = abstract;
        this.qr = qr;
        this.number_of_views = number_of_views;
    }



    // CRUD functions
    // Post
    // add research details to the db
    static addResearch(research) {
        return db.execute(
            'INSERT INTO research_details (research_id, topic_category, sdg_category, date_published, adviser, department, keywords, title, abstract, qr, number_of_views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [research.research_id, research.topic_category, research.sdg_category, research.date_published, research.adviser, research.department, research.keywords, research.title, research.abstract, research.qr, research.number_of_views]
        );
    }

    // add research_id and account_id to the db
    static addResearchAccount(research_id, school_id) {
        return db.execute(
            'INSERT INTO authored (research_id, school_id) VALUES (?, ?)', [research_id, school_id]
        );
    }

    // add research_id and school_id to the table research_list
    static addResearchList(research_id, school_id) {
        return db.execute(
            'INSERT INTO research_list (research_id, school_id) VALUES (?, ?)', [research_id, school_id]
        );
    }

    // Update
    // Get
    // Delete
    // remove specific research using research_id
    static removeResearch(research_id) {
        return db.execute(
            'DELETE FROM research_details WHERE research_id = ?', [research_id]
        );
    }

    // get all research details from the db
    static fetchAllResearch() {
        return db.execute(
            'SELECT * FROM research_details'
        );
    }

    // check if research_id exists in the db
    static checkResearchId(research_id) {
        console.log(research_id);
        // use count
        return db.execute(
            'SELECT COUNT(*) FROM research_details WHERE research_id = ?', [research_id]
        );
    }
}
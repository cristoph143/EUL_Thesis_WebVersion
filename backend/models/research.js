const db = require('../util/database');
const account = require('../models/account');
const {
    deleteResearch
} = require('../controller/research');
module.exports = class Research {
    constructor(
        research_id, topic_category, sdg_category, date_published, adviser,
        departmentID, keywords, title, abstracts, qr, number_of_views
    ) {
        this.research_id = research_id;
        this.topic_category = topic_category;
        this.sdg_category = sdg_category;
        this.date_published = date_published;
        this.adviser = adviser;
        this.departmentID = departmentID;
        this.keywords = keywords;
        this.title = title;
        this.abstracts = abstracts;
        this.qr = qr;
        this.number_of_views = number_of_views;
    }



    // CRUD functions
    // Post
    // add research details to the db
    static addResearch(research) {
        return db.execute(
            'INSERT INTO research_details (research_id, departmentID, topic_category, sdg_category, date_published, adviser, keywords, title, abstracts, qr, number_of_views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [research.research_id, research.departmentID, research.topic_category, research.sdg_category, research.date_published, research.adviser, research.keywords, research.title, research.abstracts, research.qr, research.number_of_views]
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

    // get all research details from the db
    static fetchAllResearch() {
        return db.execute(
            "SELECT research_details.*, account.*, department.DepartmentName, role.roleName FROM authored " +
            "LEFT JOIN " +
            "research_details ON research_details.research_id = authored.research_id " +
            "LEFT JOIN " +
            "department ON research_details.departmentID = department.departmentID " +
            "LEFT JOIN " +
            "account ON authored.school_id = account.school_id " +
            "LEFT JOIN " +
            "role on account.role_roleID = role.roleID;"
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

    static fetchLibrary(school_id) {
        return db.execute(
            "Select research_details.*, account.*, role.*, department.*, research_file.file, research_file.idx  from research_list " +
            "Left join " +
            "research_details on research_list.research_id = research_details.research_id " +
            "left join " +
            "account on research_list.school_id = account.school_id " +
            "left join " +
            "research_file on research_list.research_id = research_file.research_id " +
            "left join " +
            "department on research_details.departmentID = department.departmentID " +
            "left join " +
            "role on account.role_roleID = role.roleID " +
            "where research_list.school_id = ?", [school_id]
        );
    }

    // delete research
    static deleteResearch(research_id) {
        return db.execute(
            'DELETE FROM research_details WHERE research_id = ?', [research_id]
        );
    }

    // fetch research details using research_id
    static fetchResearchUsingResearch_ID(research_id) {
        return db.execute(
            'SELECT number_of_views FROM research_details WHERE research_id = ?', [research_id]
        );
    }


    static incrementViews(research_id) {
        return db.execute(
            'UPDATE research_details SET number_of_views = number_of_views + 1 where research_id = ?', [research_id]
        );
    }

    // update sdg
    static updateSdgCategory(research_id, sdg_category) {
        return db.execute(
            'UPDATE research_details SET sdg_category = ? WHERE research_id = ?', [sdg_category, research_id]
        );
    }
}
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
            "Select department.departmentID, department.DepartmentName, research_details.*, role.*, research_file.file, " +
            "account.first_name, account.last_name, account.school_id " +
            "from research_list " +
            "left join " +
            "research_details on research_details.research_id = research_list.research_id " +
            "left join " +
            "authored on authored.research_id = research_list.research_id " +
            "left join " +
            "account on account.school_id = authored.school_id " +
            "left join " +
            "role on role.roleID = account.role_roleID " +
            "left join " +
            "department on department.departmentID = research_details.departmentID " +
            "left join " +
            "research_file on research_file.research_id = research_details.research_id " +
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

    // fetch all research details using school_id
    static fetchMyResearchList(school_id) {
        return db.execute(
            "Select research_details.*, role.*, research_file.file, " +
            "account.first_name, account.last_name, account.school_id, department.DepartmentName " +
            "from authored " +
            "left join account " +
            "on authored.school_id = account.school_id " +
            "left join " +
            "research_details on research_details.research_id = authored.research_id " +
            "left join " +
            "role on role.roleID = account.role_roleID " +
            "left join " +
            "department on department.departmentID = research_details.departmentID " +
            "left join " +
            "research_file on research_file.research_id = research_details.research_id " +
            "where authored.school_id = ?", [school_id]
        )
    }

    // addMyResearchList
    static addMyResearchList(details) {
        return db.execute(
            'INSERT INTO research_list (research_id, school_id) VALUES (?, ?)', [details.research_id, details.school_id]
        );
    }

    // removeMyResearchList
    static removeMyResearchList(details) {
            return db.execute(
                'DELETE FROM research_list WHERE research_id = ? AND school_id = ?', [details.research_id, details.school_id]
            );
        }
        // checkResearchList
    static checkResearchList(details) {
        return db.execute(
            'SELECT COUNT(*) as count FROM research_list WHERE research_id = ? AND school_id = ?', [details.research_id, details.school_id]
        );
    }
}
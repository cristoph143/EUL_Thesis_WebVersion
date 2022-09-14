const db = require('../util/database');
const account = require('../account');
module.exports = class Research extends account {
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
            'INSERT INTO research (research_id, topic_category, sdg_category, date_published, adviser, department, keywords, title, abstract, qr, number_of_views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [research.research_id, research.topic_category, research.sdg_category, research.date_published, research.adviser, research.department, research.keywords, research.title, research.abstract, research.qr, research.number_of_views]
        );
    }



    // Update
    // Get
    // Delete

}
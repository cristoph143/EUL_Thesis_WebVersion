const db = require('../util/database');

module.exports = class Research_Paper {
    constructor(id, category, date_published, adviser, authors, title, abstract, keywords, department, qr) {
        this.id = id;
        this.category = category;
        this.date_published = date_published;
        this.adviser = adviser;
        this.authors = [authors];
        this.title = title;
        this.abstract = [abstract];
        this.keywords = [keywords];
        this.department = department;
        this.qr = qr;
        this.number_of_views = 0;
    }

    // Fetch

    // fetch all research papers from Research_Paper
    static fetchAllResearchPapers() {
        return db.execute('SELECT * FROM Research_Paper');
    }

    // fetch research paper using id
    static fetchById(id) {
        return db.execute('SELECT * FROM Research_Paper WHERE id = ?', [id]);
    }

    // fetch research paper using title
    static fetchByTitle(title) {
        return db.execute('SELECT * FROM Research_Paper WHERE title = ?', [title]);
    }

    // fetch research paper using adviser
    static fetchByAdviser(adviser) {
        return db.execute('SELECT * FROM Research_Paper WHERE adviser = ?', [adviser]);
    }

    // fetch research paper using authors
    static fetchByAuthors(authors) {
        return db.execute('SELECT * FROM Research_Paper WHERE authors = ?', [authors]);
    }

    // fetch research paper using keywords
    static fetchByKeywords(keywords) {
        return db.execute('SELECT * FROM Research_Paper WHERE keywords = ?', [keywords]);
    }

    // fetch research paper using department
    static fetchByDepartment(department) {
        return db.execute('SELECT * FROM Research_Paper WHERE department = ?', [department]);
    }

    // fetch research paper using qr
    static fetchByQr(qr) {
        return db.execute('SELECT * FROM Research_Paper WHERE qr = ?', [qr]);
    }


    // Post

    // create new research paper
    static createResearchPaper(id, category, date_published, adviser, authors, title, abstract, keywords, department, qr) {
        return db.execute('INSERT INTO Research_Paper (id, category, date_published, adviser, authors, title, abstract, keywords, department, qr) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, category, date_published, adviser, authors, title, abstract, keywords, department, qr]);
    }

    // Update

    // Update number of views using qr
    static updateNumberOfViews(qr) {
        return db.execute('UPDATE Research_Paper SET number_of_views = number_of_views + 1 WHERE qr = ?', [qr]);
    }

    // Update research paper using id
    static updateResearchPaper(id, category, date_published, adviser, authors, title, abstract, keywords, department, qr) {
        return db.execute('UPDATE Research_Paper SET category = ?, date_published = ?, adviser = ?, authors = ?, title = ?, abstract = ?, keywords = ?, department = ?, qr = ? WHERE id = ?', [category, date_published, adviser, authors, title, abstract, keywords, department, qr, id]);
    }


    // Delete

    // Delete research paper using id
    static deleteResearchPaper(id) {
        return db.execute('DELETE FROM Research_Paper WHERE id = ?', [id]);
    }

};
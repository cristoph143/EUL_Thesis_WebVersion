const db = require('../util/database');

module.exports = class File {
    constructor(original_name, research_id, url) {
        this.original_name = original_name;
        this.research_id = research_id;
        this.url = url;
    }

    // add research_file details
    static addResearchFile(file) {
        console.log(file.originalname + ' ' + file.research_id);
        return db.execute(
            'INSERT INTO research_file (file, research_id) VALUES (?, ?)', [file.originalname, file.research_id]
        );
    }
}
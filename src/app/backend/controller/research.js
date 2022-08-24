const Research = require('../models/research');

// Fetch

// fetch all research papers from Research_Paper
exports.fetchAllResearchPapers = async(req, res, next) => {
    try {
        const researchPapers = await Research.fetchAll();
        res.status(200).json({
            message: 'Fetched all research papers',
            researchPapers: researchPapers
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching all research papers failed'
        });
    }
};


// fetch research paper using id
exports.fetchResearchPaperById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const researchPaper = await Research.fetchById(id);
        res.status(200).json({
            message: 'Fetched research paper by id',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by id failed'
        });
    }
}


// fetch research paper using title
exports.fetchResearchPaperByTitle = async(req, res, next) => {
    try {
        const title = req.params.title;
        const researchPaper = await Research.fetchByTitle(title);
        res.status(200).json({
            message: 'Fetched research paper by title',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by title failed'
        });
    }
}


// fetch research paper using adviser
exports.fetchResearchPaperByAdviser = async(req, res, next) => {
    try {
        const adviser = req.params.adviser;
        const researchPaper = await Research.fetchByAdviser(adviser);
        res.status(200).json({
            message: 'Fetched research paper by adviser',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by adviser failed'
        });
    }
}


// fetch research paper using authors
exports.fetchResearchPaperByAuthors = async(req, res, next) => {
    try {
        const authors = req.params.authors;
        const researchPaper = await Research.fetchByAuthors(authors);
        res.status(200).json({
            message: 'Fetched research paper by authors',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by authors failed'
        });
    }
}

// fetch research paper using keywords
exports.fetchResearchPaperByKeywords = async(req, res, next) => {
    try {
        const keywords = req.params.keywords;
        const researchPaper = await Research.fetchByKeywords(keywords);
        res.status(200).json({
            message: 'Fetched research paper by keywords',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by keywords failed'
        });
    }
}

// fetch research paper using department
exports.fetchResearchPaperByDepartment = async(req, res, next) => {
    try {
        const department = req.params.department;
        const researchPaper = await Research.fetchByDepartment(department);
        res.status(200).json({
            message: 'Fetched research paper by department',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by department failed'
        });
    }
}

// fetch research paper using qr
exports.fetchResearchPaperByQr = async(req, res, next) => {
    try {
        const qr = req.params.qr;
        const researchPaper = await Research.fetchByQr(qr);
        res.status(200).json({
            message: 'Fetched research paper by qr',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fetching research paper by qr failed'
        });
    }
}


// Post

// create new research paper
exports.createResearchPaper = async(req, res, next) => {
    try {
        const researchPaper = await Research.create(req.body);
        res.status(200).json({
            message: 'Created research paper',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Creating research paper failed'
        });
    }
}


// Update

// Update number of views using qr
exports.updateNumberOfViews = async(req, res, next) => {
    try {
        const qr = req.params.qr;
        const researchPaper = await Research.updateNumberOfViews(qr);
        res.status(200).json({
            message: 'Updated number of views',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Updating number of views failed'
        });
    }
}

// Update research paper using id
exports.updateResearchPaperById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const researchPaper = await Research.updateById(id, req.body);
        res.status(200).json({
            message: 'Updated research paper by id',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Updating research paper by id failed'
        });
    }
}

// Delete

// Delete research paper using id
exports.deleteResearchPaperById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const researchPaper = await Research.deleteById(id);
        res.status(200).json({
            message: 'Deleted research paper by id',
            researchPaper: researchPaper
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Deleting research paper by id failed'
        });
    }
}
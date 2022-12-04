const research = require('../models/research');
const authoredList = require('../models/authored_list');
// const accounts = require('../models/accounts');

exports.addResearchDetails = async(req, res, next) => {
    const research_id = req.body.research_id;
    const topic_category = req.body.topic_category;
    const sdg_category = req.body.sdg_category;
    const date_published = req.body.date_published;
    const adviser = req.body.adviser;
    const department = req.body.department;
    const keywords = req.body.keywords;
    const title = req.body.title;
    const abstract = req.body.abstract;
    const qr = req.body.qr;
    const number_of_views = req.body.number_of_views;

    try {
        const researchDetails = new research(research_id, topic_category, sdg_category, date_published, adviser, department, keywords, title, abstract, qr, number_of_views);
        await research.addResearch(researchDetails);
        res.status(200).json({
            message: 'Research details added successfully'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getAllResearch = async(req, res, next) => {
    try {
        const research_list = await research.fetchAllResearch().then(token => {
            // console.log(token);
            return token;
        });
        const result = res.status(200).json(research_list);
        // console.log(research_list);
        return result;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// get similar authors using research_id
exports.getSimilarAuthor = async(req, res, next) => {
    const research_id = req.params.research_id;
    try {
        const similarAuthors = await research.getSimilarAuthors(research_id).then(token => {
            // console.log(token);
            return token;
        });
        const result = res.status(200).json(similarAuthors);
        // console.log(similarAuthors);
        res.status(200).json({
            message: 'Similar authors fetched successfully'
        });
        return result;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addAuthored = async(req, res, next) => {
    const research_id = req.body.research_id;
    const school_id = req.body.school_id;
    try {
        const details = {
            research_id: research_id,
            school_id: school_id
        }
        const addAuthored = await authoredList.addAuthored(details).then(token => {
            // console.log(token);
            return token;
        });
        // console.log("ddge")
        // console.log(addAuthored);
        res.status(200).json({
            message: 'Authored added successfully',
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addResearchList = async(req, res, next) => {
    const research_id = req.body.research_id;
    const school_id = req.body.school_id;
    try {
        const details = {
            research_id: research_id,
            school_id: school_id
        }
        const addResearchList = await authoredList.addResearchList(details).then(token => {
            // console.log(token);
            return token;
        });
        // console.log(addResearchList);
        res.status(200).json({
            message: 'Research list added successfully',
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchLibrary = async(req, res, next) => {
    const school_id = req.params.school_id;
    try {
        const library = await research.fetchLibrary(school_id).then(token => {
            // console.log(token);
            return token;
        });
        const result = res.status(200).json(library);
        // console.log(library);
        return result;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// check ownership of the research
exports.checkOwnership = async(req, res, next) => {
    const research_id = req.params.research_id;
    const school_id = req.params.school_id;
    // console.log(school_id + ' is owned by + ' + research_id);
    try {
        const check = await research.checkOwnership(school_id, research_id).then(token => {
            // console.log(token);
            return token;
        });
        const result = res.status(200).json(check);
        return result;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// delete research
exports.deleteResearch = async(req, res, next) => {
    const research_id = req.params.research_id;
    try {
        await research.deleteResearch(research_id);
        res.status(200).json({
            message: 'Research deleted successfully'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// increment by one in number_of_views using research_id
exports.incrementViews = async(req, res, next) => {
    const research_id = req.params.research_id;
    const number_of_views = req.params.number_of_views;
    console.log(research_id)
    try {
        await research.incrementViews(research_id, number_of_views);
        res.status(200).json({
            message: 'Views incremented successfully'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
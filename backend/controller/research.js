const research = require('../models/research');
const authoredList = require('../models/authored_list');
// const accounts = require('../models/accounts');

exports.addResearchDetails = async(req, res, next) => {
    const research_id = req.body.research_id;
    const departmentID = parseInt(req.body.departmentID);
    const topic_category = req.body.topic_category;
    const sdg_category = req.body.sdg_category;
    const date_published = req.body.date_published;
    const adviser = req.body.adviser;
    const keywords = req.body.keywords;
    const title = req.body.title;
    const abstracts = req.body.abstract;
    const qr = req.body.qr;
    const number_of_views = req.body.number_of_views;

    try {
        const researchDetails = {
            research_id: research_id,
            departmentID: departmentID,
            topic_category: topic_category,
            sdg_category: sdg_category,
            date_published: date_published,
            adviser: adviser,
            keywords: keywords,
            title: title,
            abstracts: abstracts,
            qr: qr,
            number_of_views: number_of_views
        }
        console.log(researchDetails)
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
        console.log(library[0])
            // convert library[0] to string
        const libraryString = JSON.stringify(library[0]);
        // convert libraryString to object
        const libraryObject = JSON.parse(libraryString);
        // console.log(libraryObject)
        res.status(200).json(library);
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
    console.log(research_id)
    try {
        let view = await research.incrementViews(research_id);
        console.log(view)
            // fetch_research using id
        const number_of_views = await research.fetchResearchUsingResearch_ID(research_id);
        console.log(number_of_views)
        return res.status(200).json({
            message: 'Views incremented successfully',
            number_of_views: number_of_views
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// update sdg_category using research_id
exports.updateSDG = async(req, res, next) => {
    const research_id = req.params.research_id;
    const sdg_category = req.body.sdg_category;
    try {
        await research.updateSdgCategory(research_id, sdg_category);
        res.status(200).json({
            message: 'Sdg category updated successfully'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
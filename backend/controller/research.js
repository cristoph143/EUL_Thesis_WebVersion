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
            console.log(token);
            return token;
        });
        const result = res.status(200).json(research_list);
        console.log(research_list);
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
            console.log(token);
            return token;
        });
        console.log("ddge")
        console.log(addAuthored);
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
            console.log(token);
            return token;
        });
        console.log(addResearchList);
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

exports.addcat = async(req, res, next) => {
    const cat = req.body.x;
    console.log(cat + 'j');
    try {
        const addcat = await research.addcat(cat).then(token => {
            console.log(token);
            return token;
        });
        console.log(addcat);
        res.status(200).json({
            message: 'Category added successfully',
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getcat = async(req, res, next) => {
    try {
        const cat = await research.getcat().then(token => {
            console.log(token);
            return token;
        });
        const result = res.status(200).json(cat);
        console.log(cat[0]);
        return result;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
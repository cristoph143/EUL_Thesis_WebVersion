const research = require('../models/research');
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
        res.status(200).json({ message: 'Research details added successfully' });
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
        const research_list = await research.fetchAllResearchListRedundant(research_id, school_id, 'authored')
            .then(token => {
                console.log(token);
                return token;
            });

        console.log(research_list[0]);
        if (research_list[0].length > 0) {
            // error 500
            const error = new Error('Research already exists');
            error.statusCode = 500;
            throw error;
        }

        await research.addResearchAccount(research_id, school_id);
        res.status(200).json({
            message: 'Research added successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addResearchList = async(req, res, next) => {
    const research_id = req.body.research_id;
    const school_id = req.body.school_id;
    try {
        const research_list = await research.fetchAllResearchListRedundant(research_id, school_id, 'research_list')
            .then(token => {
                console.log(token);
                return token;
            });

        console.log(research_list[0]);
        if (research_list[0].length > 0) {
            // error 500
            const error = new Error('Research already exists');
            error.statusCode = 500;
            throw error;
        }


        await research.addResearchList(research_id, school_id);
        res.status(200).json({
            message: 'Research added successfully',
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.removeResearch = async(req, res, next) => {
    const research_id = req.params.research_id;
    const school_id = req.body.school_id;
    console.log('sdssd')
    console.log(research_id)
    try {
        const research_list = await research.fetchAllResearchListRedundant(research_id, school_id, 'authored')
            .then(token => {
                console.log(token);
                return token;
            });

        console.log(research_list[0]);



        // await research.removeResearch(research_id);
        // res.status(200).json({ message: 'Research details removed successfully' });
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
var express = require('express');
var router = express.Router();

const {
    body
} = require('express-validator');
var researchController = require('../controller/research');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/addResearchDetails', [
    // research_id, topic_category, sdg_category, date_published, adviser, department, keywords, title, abstract, qr, number_of_views
    body('research_id').trim().not().isEmpty(),
    body('topic_category').trim().not().isEmpty(),
    body('sdg_category').trim().not().isEmpty(),
    body('date_published').trim().not().isEmpty(),
    body('adviser').trim().not().isEmpty(),
    body('department').trim().not().isEmpty(),
    body('keywords').trim().not().isEmpty(),
    body('title').trim().not().isEmpty(),
    body('abstract').trim().not().isEmpty(),
    body('qr').trim().not().isEmpty(),
    body('number_of_views').trim().not().isEmpty()
], researchController.addResearchDetails);

router.post('/addAuthored', [
    body('research_id').trim().not().isEmpty(),
    body('school_id').trim().not().isEmpty(),
], researchController.addAuthored);

router.post('/addResearchList', [
    body('research_id').trim().not().isEmpty(),
    body('school_id').trim().not().isEmpty(),
], researchController.addResearchList);

router.get('/fetchAllResearchList', researchController.getAllResearch);

module.exports = router;
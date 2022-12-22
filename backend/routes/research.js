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
    body('research_id').trim().not().isEmpty(),
    body('departmentID').trim().not().isEmpty(),
    body('topic_category'),
    body('sdg_category'),
    body('date_published').trim().not().isEmpty(),
    body('adviser').trim().not().isEmpty(),
    body('keywords'),
    body('title').trim().not().isEmpty(),
    body('abstracts').trim().not().isEmpty(),
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

router.get('/fetchLibrary/:school_id', researchController.fetchLibrary);

// delete research using research_id
router.delete('/deleteResearch/:research_id', researchController.deleteResearch);

// increment by one in number_of_views using research_id
router.get('/incrementViews/:research_id', researchController.incrementViews);

// update sdg_category using research_id
router.post('/updateSDG/:research_id/',
    body('sdg_category').trim().not().isEmpty(),
    researchController.updateSDG);

// fetchMyResearchList
router.get('/fetchMyResearchList/:school_id', researchController.fetchMyResearchList);

// addMyResearchList
router.post('/addMyResearchList', [
    body('research_id').trim().not().isEmpty(),
    body('school_id').trim().not().isEmpty(),
], researchController.addMyResearchList);


//removeMyResearchList 
router.post('/removeMyResearchList', [
    body('research_id').trim().not().isEmpty(),
    body('school_id').trim().not().isEmpty(),
], researchController.removeMyResearchList);
module.exports = router;
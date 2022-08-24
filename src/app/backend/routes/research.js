const express = require('express');

const researchController = require('../controller/research');

const router = express.Router();

// Fetch

// fetch all research papers from Research_Paper
router.get('/', researchController.fetchAllResearchPapers);

// fetch research paper using id
router.get('/:id', researchController.fetchResearchPaperById);

// fetch research paper using title
router.get('/title/:title', researchController.fetchResearchPaperByTitle);

// fetch research paper using adviser
router.get('/adviser/:adviser', researchController.fetchResearchPaperByAdviser);

// fetch research paper using authors
router.get('/authors/:authors', researchController.fetchResearchPaperByAuthors);

// fetch research paper using keywords
router.get('/keywords/:keywords', researchController.fetchResearchPaperByKeywords);

// fetch research paper using department
router.get('/department/:department', researchController.fetchResearchPaperByDepartment);

// fetch research paper using qr
router.get('/qr/:qr', researchController.fetchResearchPaperByQr);

// Post

// create new research paper
router.post('/', researchController.createResearchPaper);

// Update

// Update number of views using qr
router.put('/qr/:qr', researchController.updateNumberOfViews);

// Update research paper using id
router.put('/:id', researchController.updateResearchPaperById);

// Delete

// Delete research paper using id
router.delete('/:id', researchController.deleteResearchPaperById);


module.exports = router;
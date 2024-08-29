// routes/researchRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // For file upload if needed
const { createResearch, getResearchById, getResearchesByResearcher, updateResearch, deleteResearch, addParticipantToResearch, removeParticipantFromResearch } = require('../controllers/researchController');

// Middleware for authentication
const auth = require('../middlewares/auth');

router.post('/', createResearch);
router.get('/:id', getResearchById);
router.get('/researcher/:id', getResearchesByResearcher);
router.put('/:id', updateResearch);
router.delete('/:id', deleteResearch);
router.post('/participant', addParticipantToResearch);
router.delete('/participant', removeParticipantFromResearch);

module.exports = router;

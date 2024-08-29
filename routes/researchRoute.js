// routes/researchRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // For file upload if needed
const { createResearch, getResearchById, getResearchesByResearcher, updateResearch, deleteResearch, addParticipantToResearch, removeParticipantFromResearch ,getResearch,getResearchesByParticipant } = require('../controllers/researchController');

// Middleware for authentication
const auth = require('../middlewares/auth');

router.post('/', createResearch);
router.get('/', getResearch);
router.get('/:id', getResearchById);
router.get('/researcher/:id', getResearchesByResearcher);
router.put('/:id', updateResearch);
router.delete('/:id', deleteResearch);
router.post('/participant', addParticipantToResearch);
router.delete('/participant', removeParticipantFromResearch);
router.get('/get-participant/:participantId',getResearchesByParticipant)
module.exports = router;

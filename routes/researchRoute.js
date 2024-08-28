// routes/researchRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // For file upload if needed
const { createResearch, getResearchById, getResearchesByResearcher, updateResearch, deleteResearch, addParticipantToResearch, removeParticipantFromResearch } = require('../controllers/researchController');

// Middleware for authentication
const auth = require('../middlewares/auth');

router.post('/', auth, createResearch);
router.get('/:id', getResearchById);
router.get('/researcher', auth, getResearchesByResearcher);
router.put('/:id', auth, updateResearch);
router.delete('/:id', auth, deleteResearch);
router.post('/participant', auth, addParticipantToResearch);
router.delete('/participant', auth, removeParticipantFromResearch);

module.exports = router;

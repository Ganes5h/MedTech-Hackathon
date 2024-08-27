// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const { requestToJoinResearch, acceptParticipantRequest, rejectParticipantRequest } = require('../controllers/participantController');

// Middleware for authentication
const auth = require('../middleware/auth');

router.post('/request', auth, requestToJoinResearch);
router.post('/accept', auth, acceptParticipantRequest);
router.post('/reject', auth, rejectParticipantRequest);

module.exports = router;

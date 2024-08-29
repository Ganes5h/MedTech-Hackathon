// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const { requestToJoinResearch, handleParticipantRequest,getNumberOfParticipantRequests,getNumberOfParticipant  } = require('../controllers/participantController');

// Middleware for authentication
const auth = require('../middlewares/auth');

router.post('/request', requestToJoinResearch);
router.put('/handle',handleParticipantRequest)
router.get('/:researchId/participant-requests', getNumberOfParticipantRequests);
router.get('/participants/:id',getNumberOfParticipant)
module.exports = router;

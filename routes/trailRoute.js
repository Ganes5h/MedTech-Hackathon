// routes/trialRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createTrial, addStageToTrial, addResultToStage, addCommunicationToTrial, getTrialsByResearch } = require('../controllers/trailController');

router.post('/', auth, createTrial);  // Create trial
router.post('/stage', auth, addStageToTrial);  // Add stage to trial
router.post('/result', auth, addResultToStage);  // Add result to stage
router.post('/communication', auth, addCommunicationToTrial);  // Add communication to trial
router.get('/research/:researchId', getTrialsByResearch);  // Get all trials by research

module.exports = router;

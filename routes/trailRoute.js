// routes/trialRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createTrial, addStageToTrial, addResultToStage, addCommunicationToTrial, getTrialsByResearch } = require('../controllers/trailController');

router.post('/', createTrial);  // Create trial
router.post('/stage', addStageToTrial);  // Add stage to trial
router.post('/result', addResultToStage);  // Add result to stage
router.post('/communication', addCommunicationToTrial);  // Add communication to trial
router.get('/:researchId', getTrialsByResearch);  

module.exports = router;

// controllers/trialController.js
const Trial = require('../models/trailModel');
const Research = require('../models/ResearchModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel'); // Assuming a Notification model exists
const { validationResult } = require('express-validator');

// Create a Trial
// This option will be available for both researcher and participant 
exports.createTrial = async (req, res) => {
  const { researchId, description,userId } = req.body;

  try {
    // Check if research exists
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    //Check if user is part of the research or is the researcher
    if (research.createdBy.toString() !== req.user.id && !research.participants.includes(req.user.id)) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const trial = new Trial({
      research: researchId,
      createdBy: userId,
      description
    });

    await trial.save();
    res.status(201).json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add Stage to Trial
// This is also for the both 
exports.addStageToTrial = async (req, res) => {
  const { trialId, title, description } = req.body;

  try {
    const trial = await Trial.findById(trialId);
    if (!trial) {
      return res.status(404).json({ msg: 'Trial not found' });
    }

    if (trial.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    trial.stages.push({
      title,
      description
    });

    await trial.save();
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add Result to Stage
// This is also for the both 
exports.addResultToStage = async (req, res) => {
  const { trialId, stageId, result } = req.body;

  try {
    const trial = await Trial.findById(trialId);
    if (!trial) {
      return res.status(404).json({ msg: 'Trial not found' });
    }

    const stage = trial.stages.id(stageId);
    if (!stage) {
      return res.status(404).json({ msg: 'Stage not found' });
    }

    stage.results.push(result);
    await trial.save();
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add Communication to Trial
// This is to handle the communication between the memebers need to design a proper layout to handle communication
exports.addCommunicationToTrial = async (req, res) => {
  const { trialId, participantId, message } = req.body;

  try {
    const trial = await Trial.findById(trialId);
    if (!trial) {
      return res.status(404).json({ msg: 'Trial not found' });
    }

    // if (!trial.communications.find(c => c.participant.toString() === participantId.toString())) {
    //   return res.status(401).json({ msg: 'Participant not authorized' });
    // }

    trial.communications.push({
      participant: participantId,
      message
    });

    // Create a notification (optional)
    const notification = new Notification({
      user: participantId,
      message: `New message in trial ${trialId}`
    });

    await notification.save();

    await trial.save();
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Trials by Research
exports.getTrialsByResearch = async (req, res) => {
  try {
    const trials = await Trial.find({ research: req.params.researchId }).populate('createdBy', 'name email');
    if(!trials){
        res.status(400).json("Trails Not Found")
    }
    res.json(trials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

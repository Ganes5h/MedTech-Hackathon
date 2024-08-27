// controllers/participantController.js
const Research = require('../models/ResearchModel');
const User = require('../models/userModel');

// Request to Join Research
exports.requestToJoinResearch = async (req, res) => {
  const { researchId } = req.body;

  try {
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already a participant in this research' });
    }

    // Add participant request
    research.participantRequests.push(req.user.id);
    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Accept Participant Request
exports.acceptParticipantRequest = async (req, res) => {
  const { researchId, participantId } = req.body;

  try {
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (!research.participantRequests.includes(participantId)) {
      return res.status(400).json({ msg: 'Participant request not found' });
    }

    // Accept participant request
    research.participants.push(participantId);
    research.participantRequests = research.participantRequests.filter(id => id.toString() !== participantId);
    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Reject Participant Request
exports.rejectParticipantRequest = async (req, res) => {
  const { researchId, participantId } = req.body;

  try {
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (!research.participantRequests.includes(participantId)) {
      return res.status(400).json({ msg: 'Participant request not found' });
    }

    // Reject participant request
    research.participantRequests = research.participantRequests.filter(id => id.toString() !== participantId);
    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

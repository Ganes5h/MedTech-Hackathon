const ResearchModel = require('../models/ResearchModel');
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

    if (research.participantRequests.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already requested to join this research' });
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

// Handle Participant Request (Accept/Reject)
exports.handleParticipantRequest = async (req, res) => {
  const { researchId, participantId, action } = req.body;

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

    if (action === 'accept') {
      // Accept participant request
      research.participants.push(participantId);
      research.participantRequests = research.participantRequests.filter(id => id.toString() !== participantId);
    } else if (action === 'reject') {
      // Reject participant request
      research.participantRequests = research.participantRequests.filter(id => id.toString() !== participantId);
    } else {
      return res.status(400).json({ msg: 'Invalid action' });
    }

    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Number of Participant Requests
exports.getNumberOfParticipantRequests = async (req, res) => {
  const { researchId } = req.params;

  try {
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    const numberOfRequests = research.participantRequests.length;
    res.json({ numberOfRequests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getNumberOfParticipant = async (req, res) => {
    try {
      const id = req.params.id;
      const research = await ResearchModel.findById(id);
  
      if (!research) {
        return res.status(404).json("No Research Found");
      }
  
      const totalParticipants = research.participants.length;
      res.status(200).json({ totalParticipants });
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };
  
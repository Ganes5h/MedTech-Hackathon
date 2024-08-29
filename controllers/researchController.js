// controllers/researchController.js
const Research = require('../models/ResearchModel');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const upload = require('../middlewares/upload')
// Create Research
exports.createResearch = [
    upload.array('mediaFiles', 5), // Max 5 files can be uploaded at once
    async (req, res) => {
      const { title, description } = req.body;
      const researcherId = req.query.userId;
  
      // Check if required fields are provided
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }
  
      // Get file paths from multer's file handling
      const mediaPaths = req.files.map(file => file.path);
  
      try {
        // Create a new research entry with mediaPaths
        const research = new Research({
          title,
          description,
          mediaPaths, // Store the file paths in the database
          createdBy: researcherId,
        });
  
        await research.save();
        res.status(201).json(research);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  ];

// Get Research by ID
exports.getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id).populate('createdBy', 'name email');
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Researches by Researcher
exports.getResearchesByResearcher = async (req, res) => {
  try {
    const id = req.params.id
    const researches = await Research.find({ createdBy:id });
    res.json(researches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Research
exports.updateResearch = async (req, res) => {
  const { title, description, mediaPaths } = req.body;

  try {
    let research = await Research.findById(req.params.id);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    research.title = title || research.title;
    research.description = description || research.description;
    research.mediaPaths = mediaPaths || research.mediaPaths;

    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete Research
exports.deleteResearch = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await research.remove();
    res.json({ msg: 'Research removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add Participant to Research
exports.addParticipantToResearch = async (req, res) => {
  const { researchId } = req.body;

  try {
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.createdBy.toString() === req.user.id) {
      return res.status(400).json({ msg: 'Researcher cannot join their own research' });
    }

    // Check if participant is already in the research
    if (research.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already a participant in this research' });
    }

    research.participants.push(req.user.id);
    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Remove Participant from Research
exports.removeParticipantFromResearch = async (req, res) => {
  const { researchId } = req.body;

  try {
    const research = await Research.findById(researchId);
    if (!research) {
      return res.status(404).json({ msg: 'Research not found' });
    }

    if (research.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    research.participants = research.participants.filter(participantId => participantId.toString() !== req.user.id);
    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

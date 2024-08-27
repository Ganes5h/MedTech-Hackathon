// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { signup, login, updateProfile, getUserById } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', upload.single('profilePhoto'), updateProfile);
router.get('/:id', getUserById);

module.exports = router;

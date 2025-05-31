const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote
} = require('../controllers/notescontroller');

router.use(protect); // used protect midddleware from auth.js

router.post('/', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;

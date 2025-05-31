const Note = require('../models/notes');

const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || title.trim() === '') {
      res.status(400);
      return next(new Error('Title is required'));
    }

    const note = await Note.create({ title, content, tags, user: req.userId });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    res.status(400);
    return next(new Error('Note title cannot be empty'));
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!note) {
      res.status(404);
      return next(new Error('Note not found'));
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!note) {
      res.status(404);
      return next(new Error('Note not found'));
    }

    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };

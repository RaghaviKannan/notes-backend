const Note = require("../models/notes");

const createNote = async (req, res) => {
  const { title, content, category } = req.body;
  const userId = req.user.userId;

  try {
    const note = new Note({ userId, title, content, category });
    await note.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNotes = async (req, res) => {
  const userId = req.user.userId;

  try {
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNoteById = async (req, res) => {
  const userId = req.user.userId;
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ userId, _id: noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateNote = async (req, res) => {
  const userId = req.user.userId;
  const noteId = req.params.id;
  const { title, content, category } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { userId, _id: noteId },
      { title, content, category },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNote = async (req, res) => {
  const userId = req.user.userId;
  const noteId = req.params.id;

  try {
    const note = await Note.findOneAndDelete({ userId, _id: noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };

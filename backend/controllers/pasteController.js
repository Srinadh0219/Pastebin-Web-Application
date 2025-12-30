// backend/controllers/pasteController.js

const Paste = require("../models/Paste");

// Create a new paste
const createPaste = async (req, res) => {
  try {
    const { content, expiresIn, maxViews } = req.body;

    const paste = await Paste.create({
      content,
      expiresIn: expiresIn || 0,
      maxViews: maxViews || 0,
    });

    res.status(201).json({ _id: paste._id, content: paste.content, views: paste.views });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a paste by ID
const getPaste = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.status(404).json({ error: "Paste not found" });

    // Increment views only once per session (or simple for dev)
    paste.views += 1;
    await paste.save();

    res.json({ content: paste.content, views: paste.views });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createPaste, getPaste };

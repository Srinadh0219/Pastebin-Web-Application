const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  maxViews: { type: Number, default: null },
  expiresIn: { type: Number, default: null }, // in seconds
}, { timestamps: true });

module.exports = mongoose.model("Paste", pasteSchema);

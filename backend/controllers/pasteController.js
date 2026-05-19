const Paste = require("../models/Paste");

exports.createPaste = async (req, res) => {
  const { content, maxViews, expiryMinutes } = req.body;

  const expiresAt = expiryMinutes
    ? new Date(Date.now() + expiryMinutes * 60 * 1000)
    : null;

  const paste = await Paste.create({
    content,
    maxViews,
    expiresAt,
  });

  res.status(201).json({ _id: paste._id });
};

exports.getPaste = async (req, res) => {
  const paste = await Paste.findById(req.params.id);

  if (!paste) {
    return res.status(404).json({ error: "Paste not found" });
  }

  // ✅ TIME EXPIRY CHECK
  if (paste.expiresAt && paste.expiresAt < new Date()) {
    return res.status(410).json({ error: "Paste expired" });
  }

  // ✅ VIEW LIMIT CHECK
  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return res.status(410).json({ error: "Paste expired" });
  }

  // ✅ INCREMENT VIEW ONLY ON SUCCESS
  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    views: paste.views,
    maxViews: paste.maxViews,
  });
};

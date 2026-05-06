import Resource from "../models/Resource.js";

// 📥 GET ALL
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📤 CREATE
export const createResource = async (req, res) => {
  try {
    const resource = new Resource({
      title: req.body.title,
      category: req.body.category,
      file: req.file.filename, // ✅ important
    });

    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE
export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑 DELETE
export const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
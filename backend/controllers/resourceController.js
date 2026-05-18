import Resource from "../models/Resource.js";

// ✅ GET ALL
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE
export const createResource = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded" });
    }

    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      file: req.file.filename,
    });

    await resource.save();

    res.status(201).json(resource);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Upload failed",
    });
  }
};

// ✅ DELETE
export const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);

    res.json({
      message: "Resource deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ UPDATE
export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
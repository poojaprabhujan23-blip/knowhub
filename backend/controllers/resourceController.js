import Resource from "../models/Resource.js";

// GET ALL RESOURCES
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE RESOURCE
export const createResource = async (req, res) => {
  try {
    const resource = new Resource({
      title: req.body.title,
      category: req.body.category,
      file: req.file?.path || "",
    });

    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE RESOURCE
export const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// 📥 GET COMMENTS
router.get("/:resourceId", async (req, res) => {
  const comments = await Comment.find({
    resourceId: req.params.resourceId,
  });
  res.json(comments);
});

// 📤 POST COMMENT
router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

export default router;
import express from "express";

import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  addReply,
  editReply,
  deleteReply,
} from "../controllers/commentController.js";

const router = express.Router();

//COMMENTS
router.post("/", createComment);

router.get("/:resourceId", getComments);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

//REPLIES
router.put("/reply/:id", addReply);

router.put("/reply/edit/:id", editReply);

router.delete("/reply/:id", deleteReply);

export default router;
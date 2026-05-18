import Comment from "../models/Comment.js";

//CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);

    await newComment.save();

    res.status(201).json({
      message: "Comment added",
      comment: newComment,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

//GET COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      resourceId: req.params.resourceId,
    });

    res.json(comments);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

//EDIT COMMENT
export const updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
      },
      { new: true }
    );

    res.json({
      message: "Comment updated",
      comment: updated,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update failed",
    });
  }
};

//DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

//ADD REPLY
export const addReply = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(
      req.params.id,
      {
        reply: req.body.reply,
      }
    );

    res.json({
      message: "Reply added successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Reply failed",
    });
  }
};

//EDIT REPLY
export const editReply = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(
      req.params.id,
      {
        reply: req.body.reply,
      }
    );

    res.json({
      message: "Reply updated successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Reply update failed",
    });
  }
};

//DELETE REPLY
export const deleteReply = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(
      req.params.id,
      {
        reply: "",
      }
    );

    res.json({
      message: "Reply deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Reply delete failed",
    });
  }
};
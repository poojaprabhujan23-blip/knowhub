import { useEffect, useState } from "react";
import {
  getResources,
  deleteResource,
  updateResource,
} from "../../api/resourceApi";

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  // COMMENTS
  const [comments, setComments] = useState({});

  // REPLY
  const [replyText, setReplyText] = useState({});
  const [showReply, setShowReply] = useState({});

  // EDIT REPLY
  const [editingReplyId, setEditingReplyId] =
    useState(null);

  const [editedReply, setEditedReply] =
    useState("");

  // FETCH RESOURCES
  useEffect(() => {
    fetchResources();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getResources();

      setResources(res.data);

      res.data.forEach((resource) => {
        fetchComments(resource._id);
      });

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH COMMENTS
  const fetchComments = async (resourceId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${resourceId}`
      );

      const data = await res.json();

      setComments((prev) => ({
        ...prev,
        [resourceId]: data,
      }));

    } catch (error) {
      console.log(error);
    }
  };

  // POST REPLY
  const postReply = async (
    commentId,
    resourceId
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/reply/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            reply: replyText[commentId],
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

      setReplyText((prev) => ({
        ...prev,
        [commentId]: "",
      }));

      setShowReply((prev) => ({
        ...prev,
        [commentId]: false,
      }));

      fetchComments(resourceId);

    } catch (error) {
      console.log(error);

      alert("Reply failed");
    }
  };

  // START EDIT REPLY
  const startEditReply = (comment) => {
    setEditingReplyId(comment._id);

    setEditedReply(comment.reply);
  };

  // UPDATE REPLY
  const updateReply = async (
    commentId,
    resourceId
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/reply/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            reply: editedReply,
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

      setEditingReplyId(null);

      setEditedReply("");

      fetchComments(resourceId);

    } catch (error) {
      console.log(error);

      alert("Reply update failed");
    }
  };

  // DELETE REPLY
  const deleteReply = async (
    commentId,
    resourceId
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/reply/${commentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      alert(data.message);

      fetchComments(resourceId);

    } catch (error) {
      console.log(error);

      alert("Reply delete failed");
    }
  };

  // DELETE RESOURCE
  const handleDelete = async (id) => {
    try {
      await deleteResource(id);

      setResources((prev) =>
        prev.filter((res) => res._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT RESOURCE
  const handleEdit = (res) => {
    setEditId(res._id);

    setEditData({
      title: res.title,
      description: res.description,
    });
  };

  // UPDATE RESOURCE
  const handleUpdate = async (id) => {
    try {
      const response = await updateResource(id, {
        title: editData.title,
        description: editData.description,
      });

      setResources((prev) =>
        prev.map((item) =>
          item._id === id
            ? response.data
            : item
        )
      );

      alert("Updated Successfully");

      setEditId(null);

    } catch (error) {
      console.log(error);

      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          📚 Resource Management
        </h1>

        <p style={styles.subtitle}>
          Manage resources and viewer comments
        </p>
      </div>

      {/* SEARCH */}
      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.search}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          style={styles.filter}
        >
          <option value="All">All</option>
          <option value="DBMS">DBMS</option>
          <option value="OS">OS</option>
          <option value="CN">CN</option>
        </select>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {resources
          .filter((res) =>
            filter === "All"
              ? true
              : res.category === filter
          )

          .filter((res) =>
            res.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )

          .map((res) => (
            <div
              key={res._id}
              style={styles.card}
            >
              {editId === res._id ? (
                <>
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        title:
                          e.target.value,
                      })
                    }
                    style={styles.input}
                  />

                  <textarea
                    value={
                      editData.description
                    }
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description:
                          e.target.value,
                      })
                    }
                    style={styles.textarea}
                  />

                  <button
                    onClick={() =>
                      handleUpdate(res._id)
                    }
                    style={styles.saveBtn}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div style={styles.iconBox}>
                    📘
                  </div>

                  <h3 style={styles.cardTitle}>
                    {res.title}
                  </h3>

                  <p style={styles.description}>
                    {res.description}
                  </p>

                  <div
                    style={styles.categoryBox}
                  >
                    📂 {res.category}
                  </div>

                  {res.file && (
                    <a
                      href={`http://localhost:5000/uploads/${res.file}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      ⬇ Download PDF
                    </a>
                  )}

                  <div
                    style={styles.buttonGroup}
                  >
                    <button
                      onClick={() =>
                        handleEdit(res)
                      }
                      style={styles.editBtn}
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          res._id
                        )
                      }
                      style={styles.deleteBtn}
                    >
                      🗑 Delete
                    </button>
                  </div>

                  {/* COMMENTS */}
                  <div
                    style={
                      styles.commentSection
                    }
                  >
                    <h4
                      style={
                        styles.commentHeading
                      }
                    >
                      💬 Viewer Comments
                    </h4>

                    {comments[res._id]
                      ?.length > 0 ? (
                      comments[
                        res._id
                      ].map((c) => (
                        <div
                          key={c._id}
                          style={
                            styles.commentBox
                          }
                        >
                          {/* VIEWER COMMENT */}
                          <strong>
                            👤 {c.user}
                          </strong>

                          <p
                            style={
                              styles.commentText
                            }
                          >
                            {c.text}
                          </p>

                          {/* REPLY */}
                          {c.reply && (
                            <div
                              style={
                                styles.replyBox
                              }
                            >
                              <strong>
                                Contributor
                                Reply:
                              </strong>

                              {editingReplyId ===
                              c._id ? (
                                <>
                                  <textarea
                                    value={
                                      editedReply
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      setEditedReply(
                                        e
                                          .target
                                          .value
                                      )
                                    }
                                    style={
                                      styles.replyInput
                                    }
                                  />

                                  <button
                                    style={
                                      styles.sendReplyBtn
                                    }
                                    onClick={() =>
                                      updateReply(
                                        c._id,
                                        res._id
                                      )
                                    }
                                  >
                                    Save Reply
                                  </button>
                                </>
                              ) : (
                                <p>
                                  {c.reply}
                                </p>
                              )}

                              <div
                                style={{
                                  display:
                                    "flex",
                                  gap: "10px",
                                  marginTop:
                                    "10px",
                                }}
                              >
                                <button
                                  style={
                                    styles.replyBtn
                                  }
                                  onClick={() =>
                                    startEditReply(
                                      c
                                    )
                                  }
                                >
                                  ✏ Edit
                                  Reply
                                </button>

                                <button
                                  style={
                                    styles.deleteBtn
                                  }
                                  onClick={() =>
                                    deleteReply(
                                      c._id,
                                      res._id
                                    )
                                  }
                                >
                                  🗑 Delete
                                  Reply
                                </button>
                              </div>
                            </div>
                          )}

                          {/* ADD REPLY */}
                          {!c.reply && (
                            <>
                              <button
                                style={
                                  styles.replyBtn
                                }
                                onClick={() =>
                                  setShowReply(
                                    (
                                      prev
                                    ) => ({
                                      ...prev,
                                      [c._id]:
                                        !prev[
                                          c
                                            ._id
                                        ],
                                    })
                                  )
                                }
                              >
                                Reply
                              </button>

                              {showReply[
                                c._id
                              ] && (
                                <>
                                  <textarea
                                    placeholder="Write reply..."
                                    value={
                                      replyText[
                                        c._id
                                      ] || ""
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      setReplyText(
                                        (
                                          prev
                                        ) => ({
                                          ...prev,
                                          [c._id]:
                                            e
                                              .target
                                              .value,
                                        })
                                      )
                                    }
                                    style={
                                      styles.replyInput
                                    }
                                  />

                                  <button
                                    style={
                                      styles.sendReplyBtn
                                    }
                                    onClick={() =>
                                      postReply(
                                        c._id,
                                        res._id
                                      )
                                    }
                                  >
                                    Send Reply
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      ))
                    ) : (
                      <p
                        style={
                          styles.noComment
                        }
                      >
                        No comments yet
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Poppins",
    background:
      "linear-gradient(135deg,#0f172a,#1e1b4b,#581c87)",
    color: "white",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "32px",
  },

  subtitle: {
    color: "#cbd5e1",
  },

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  search: {
    padding: "12px",
    borderRadius: "10px",
  },

  filter: {
    padding: "12px",
    borderRadius: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "20px",
  },

  iconBox: {
    fontSize: "40px",
  },

  cardTitle: {
    marginTop: "10px",
  },

  description: {
    color: "#cbd5e1",
  },

  categoryBox: {
    marginTop: "10px",
  },

  link: {
    display: "block",
    marginTop: "10px",
    color: "#60a5fa",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  editBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "green",
    color: "white",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    marginBottom: "10px",
  },

  commentSection: {
    marginTop: "20px",
  },

  commentHeading: {
    marginBottom: "10px",
  },

  commentBox: {
    background: "rgba(255,255,255,0.08)",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  commentText: {
    marginTop: "6px",
  },

  replyBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "white",
    cursor: "pointer",
  },

  replyInput: {
    width: "100%",
    minHeight: "70px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
  },

  sendReplyBtn: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "green",
    color: "white",
    cursor: "pointer",
  },

  replyBox: {
    marginTop: "12px",
    background: "rgba(34,197,94,0.15)",
    padding: "10px",
    borderRadius: "10px",
  },

  noComment: {
    color: "#cbd5e1",
  },
};

export default ResourceList;
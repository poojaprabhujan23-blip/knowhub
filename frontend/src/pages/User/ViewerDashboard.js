import { useEffect, useState } from "react";
import { getResources } from "../../api/resourceApi";

function ViewerDashboard() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] =
    useState("");

  // COMMENTS
  const [comments, setComments] = useState({});

  // COMMENT INPUTS
  const [commentInputs, setCommentInputs] =
    useState({});

  // OPEN COMMENTS
  const [openComments, setOpenComments] =
    useState({});

  // EDIT STATES
  const [editingCommentId, setEditingCommentId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  // ================= FETCH RESOURCES =================
  const fetchResources = async () => {
    try {
      const res = await getResources();

      setResources(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER =================
  const selectedCategory =
    category === "Other"
      ? customCategory
      : category;

  const filtered = resources.filter((r) => {
    return (
      r.title
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (selectedCategory === "" ||
        r.category
          .toLowerCase()
          .includes(
            selectedCategory.toLowerCase()
          ))
    );
  });

  // ================= FETCH COMMENTS =================
  const fetchComments = async (id) => {
    try {
      setOpenComments((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      const res = await fetch(
        `http://localhost:5000/api/comments/${id}`
      );

      const data = await res.json();

      setComments((prev) => ({
        ...prev,
        [id]: data,
      }));

    } catch (err) {
      console.log(err);
    }
  };

   // ================= POST COMMENT =================
const postComment = async (id) => {
  try {
    const text = commentInputs[id];

    if (!text || text.trim() === "") {
      alert("Enter comment");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await fetch(
      "http://localhost:5000/api/comments",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          text,
          user: user.name,
          resourceId: id,
        }),
      }
    );

    const data = await res.json();

    // ✅ COMMENT OBJECT
    const newComment =
      data.comment || {
        _id: Date.now(),
        text,
        user: user.name,
      };

    // ✅ SHOW COMMENT IMMEDIATELY
    setComments((prev) => ({
      ...prev,

      [id]: [
        ...(prev[id] || []),
        newComment,
      ],
    }));

    setCommentInputs((prev) => ({
      ...prev,
      [id]: "",
    }));

    alert("Comment posted");

  } catch (err) {
    console.log(err);

    alert("Comment failed");
  }
};

  // ================= DELETE COMMENT =================
  const deleteComment = async (
    commentId,
    resourceId
  ) => {
    try {
      await fetch(
        `http://localhost:5000/api/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      setComments((prev) => ({
        ...prev,
        [resourceId]:
          prev[resourceId].filter(
            (c) => c._id !== commentId
          ),
      }));

      alert("Comment deleted");

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ================= START EDIT =================
  const startEdit = (comment) => {
    setEditingCommentId(comment._id);

    setEditText(comment.text);
  };

   // ================= SAVE EDIT =================
const saveEdit = async (
  commentId,
  resourceId
) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/comments/${commentId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          text: editText,
        }),
      }
    );

    const data = await res.json();

    // ✅ UPDATED COMMENT
    const updatedComment =
      data.comment || {
        _id: commentId,
        text: editText,
      };

    // ✅ KEEP ALL COMMENTS VISIBLE
    setComments((prev) => ({
      ...prev,

      [resourceId]: prev[
        resourceId
      ].map((c) =>
        c._id === commentId
          ? {
              ...c,
              text:
                updatedComment.text,
            }
          : c
      ),
    }));

    // ✅ CLOSE EDIT BOX
    setEditingCommentId(null);

    setEditText("");

    alert("Comment updated");

  } catch (err) {
    console.log(err);

    alert("Edit failed");
  }
};

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            📚 Viewer Dashboard
          </h1>

          <p style={styles.subtitle}>
            Explore and download learning
            resources
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="🔍 Search resources..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);

            setCustomCategory("");
          }}
          style={styles.select}
        >
          <option value="">
            All Categories
          </option>

          <option value="DBMS">
            DBMS
          </option>

          <option value="OS">
            OS
          </option>

          <option value="CN">
            CN
          </option>

          <option value="Java">
            Java
          </option>

          <option value="Python">
            Python
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {category === "Other" && (
          <input
            type="text"
            placeholder="Enter category..."
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(
                e.target.value
              )
            }
            style={styles.input}
          />
        )}
      </div>

      {/* RESOURCE CARDS */}
      <div style={styles.grid}>
        {filtered.map((res) => {
          const fileName = res.file.replace(
            /^uploads\//,
            ""
          );

          return (
            <div
              key={res._id}
              style={styles.card}
            >
              {/* TOP */}
              <div style={styles.cardTop}>
                <div style={styles.icon}>
                  📄
                </div>

                <div>
                  <h3 style={styles.cardTitle}>
                    {res.title}
                  </h3>

                  <span
                    style={styles.category}
                  >
                    {res.category}
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div style={styles.buttonGroup}>
                <a
                  href={`http://localhost:5000/uploads/${fileName}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.downloadBtn}
                >
                  ⬇ Download
                </a>

                <button
                  style={styles.commentBtn}
                  onClick={() =>
                    fetchComments(res._id)
                  }
                >
                  💬 Comments
                </button>
              </div>

              {/* COMMENTS */}
              {openComments[res._id] && (
                <>
                  <div
                    style={{
                      marginTop: "14px",
                    }}
                  >
                    {(comments[res._id] ||
                      []).map((c) => (
                      <div
                        key={c._id}
                        style={
                          styles.commentBox
                        }
                      >
                        {/* USER */}
                        <b>{c.user}</b>

                        {/* COMMENT */}
                        <p
                          style={{
                            margin:
                              "8px 0",
                          }}
                        >
                          {c.text}
                        </p>

                        {/* EDIT AREA */}
                        {editingCommentId ===
                          c._id && (
                          <div
                            style={{
                              marginTop:
                                "10px",
                            }}
                          >
                            <textarea
                              value={
                                editText
                              }
                              onChange={(
                                e
                              ) =>
                                setEditText(
                                  e.target
                                    .value
                                )
                              }
                              style={{
                                ...styles.textarea,
                                background:
                                  "#1e293b",
                                border:
                                  "2px solid #3b82f6",
                                color:
                                  "white",
                              }}
                            />

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
                                  styles.saveBtn
                                }
                                onClick={() =>
                                  saveEdit(
                                    c._id,
                                    res._id
                                  )
                                }
                              >
                                Save
                              </button>

                              <button
                                style={
                                  styles.deleteBtn
                                }
                                onClick={() => {
                                  setEditingCommentId(
                                    null
                                  );

                                  setEditText(
                                    ""
                                  );
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* BUTTONS */}
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
                              styles.editBtn
                            }
                            onClick={() =>
                              startEdit(
                                c
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            style={
                              styles.deleteBtn
                            }
                            onClick={() =>
                              deleteComment(
                                c._id,
                                res._id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>

                        {/* CONTRIBUTOR REPLY */}
                        {c.reply && (
                          <div
                            style={{
                              marginTop:
                                "12px",
                              background:
                                "rgba(34,197,94,0.15)",
                              padding:
                                "10px",
                              borderRadius:
                                "10px",
                            }}
                          >
                            <b>
                              Contributor
                              Reply:
                            </b>

                            <p
                              style={{
                                marginTop:
                                  "6px",
                              }}
                            >
                              {c.reply}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* INPUT */}
                  <textarea
                    placeholder="Write a comment..."
                    value={
                      commentInputs[
                        res._id
                      ] || ""
                    }
                    onChange={(e) =>
                      setCommentInputs(
                        (prev) => ({
                          ...prev,
                          [res._id]:
                            e.target
                              .value,
                        })
                      )
                    }
                    style={styles.textarea}
                  />

                  {/* POST */}
                  <button
                    style={styles.postBtn}
                    onClick={() =>
                      postComment(res._id)
                    }
                  >
                    Post Comment
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    fontFamily:
      "'Poppins', sans-serif",
    background:
      "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #6d28d9 100%)",
    color: "white",
  },

  header: {
    marginBottom: "28px",
  },

  title: {
    fontSize: "34px",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "15px",
  },

  topBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "30px",
  },

  input: {
    padding: "12px",
    width: "250px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.15)",
    background:
      "rgba(255,255,255,0.10)",
    color: "white",
    outline: "none",
  },

  select: {
    padding: "12px",
    width: "220px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.15)",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
    fontWeight: "500",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },

  card: {
    background:
      "rgba(255,255,255,0.10)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    padding: "22px",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.25)",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "18px",
  },

  icon: {
    width: "55px",
    height: "55px",
    borderRadius: "16px",
    background:
      "linear-gradient(to right, #3b82f6, #9333ea)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
    marginBottom: "6px",
  },

  category: {
    background:
      "rgba(255,255,255,0.15)",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#e2e8f0",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
  },

  downloadBtn: {
    flex: 1,
    padding: "11px",
    borderRadius: "12px",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    background:
      "linear-gradient(to right, #3b82f6, #2563eb)",
  },

  commentBtn: {
    flex: 1,
    padding: "11px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: "600",
    background:
      "linear-gradient(to right, #8b5cf6, #7c3aed)",
  },

  textarea: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.15)",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
    minHeight: "90px",
  },

  postBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: "600",
    background:
      "linear-gradient(to right, #22c55e, #16a34a)",
  },

  commentBox: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "8px",
    color: "#e2e8f0",
  },

  editBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#3b82f6",
    color: "white",
  },

  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ef4444",
    color: "white",
  },

  saveBtn: {
    marginTop: "10px",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#22c55e",
    color: "white",
    fontWeight: "600",
  },
};

export default ViewerDashboard;
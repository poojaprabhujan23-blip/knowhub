import { useParams } from "react-router-dom";
import { useState } from "react";

function ResourceDetails() {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const resources = [
    {
      id: 1,
      title: "Data Structures Notes",
      description:
        "Complete guide to arrays, stacks, queues, and trees",
    },
    {
      id: 2,
      title: "Operating System Concepts",
      description:
        "Process management, scheduling, and memory management",
    },
    {
      id: 3,
      title: "DBMS Fundamentals",
      description:
        "Normalization, SQL queries, and database design",
    },
    {
      id: 4,
      title: "Computer Networks",
      description:
        "OSI model, TCP/IP, and networking basics",
    },
    {
      id: 5,
      title: "Software Engineering",
      description:
        "SDLC, Agile methodology, and project management",
    },
  ];

  const resource = resources.find(
    (res) => res.id === parseInt(id)
  );

  const handleAddComment = () => {
    if (comment.trim() === "") return;

    setComments([...comments, comment]);
    setComment("");
  };

  if (!resource)
    return (
      <h2 style={{ color: "white", textAlign: "center" }}>
        Resource not found
      </h2>
    );

  return (
    <div style={styles.container}>
      {/* RESOURCE CARD */}
      <div style={styles.card}>
        <div style={styles.iconBox}>📘</div>

        <h2 style={styles.title}>{resource.title}</h2>

        <p style={styles.description}>
          {resource.description}
        </p>

        <div style={styles.infoRow}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoNumber}>120+</h3>
            <p style={styles.infoText}>Downloads</p>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoNumber}>4.8★</h3>
            <p style={styles.infoText}>Rating</p>
          </div>
        </div>

        <button
          style={styles.downloadBtn}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow =
              "0 10px 25px rgba(59,130,246,0.45)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px)";
            e.target.style.boxShadow =
              "0 6px 18px rgba(59,130,246,0.35)";
          }}
        >
          ⬇ Download Resource
        </button>
      </div>

      {/* DISCUSSION SECTION */}
      <div style={styles.commentSection}>
        <h3 style={styles.commentTitle}>
          💬 Discussion Forum
        </h3>

        <p style={styles.commentSub}>
          Ask doubts, share feedback and discuss the
          resource with others.
        </p>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={handleAddComment}
            style={styles.addBtn}
          >
            Post
          </button>
        </div>

        <div style={styles.commentsList}>
          {comments.length === 0 ? (
            <p style={styles.emptyText}>
              No comments yet
            </p>
          ) : (
            comments.map((c, index) => (
              <div key={index} style={styles.comment}>
                <div style={styles.avatar}>
                  {c.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 style={styles.userName}>
                    Student
                  </h4>

                  <p style={styles.commentText}>
                    {c}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #6d28d9 100%)",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },

  card: {
    width: "100%",
    maxWidth: "800px",
    padding: "35px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    marginBottom: "30px",
    textAlign: "center",
  },

  iconBox: {
    width: "80px",
    height: "80px",
    borderRadius: "22px",
    margin: "0 auto 20px",
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "35px",
    boxShadow: "0 0 25px rgba(139,92,246,0.45)",
  },

  title: {
    fontSize: "2.2rem",
    marginBottom: "15px",
    fontWeight: "700",
  },

  description: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "1rem",
    marginBottom: "30px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  infoCard: {
    background: "rgba(255,255,255,0.08)",
    padding: "18px 28px",
    borderRadius: "18px",
    minWidth: "140px",
  },

  infoNumber: {
    margin: 0,
    fontSize: "1.6rem",
  },

  infoText: {
    marginTop: "6px",
    color: "#cbd5e1",
    fontSize: "0.9rem",
  },

  downloadBtn: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 6px 18px rgba(59,130,246,0.35)",
  },

  commentSection: {
    width: "100%",
    maxWidth: "800px",
    padding: "30px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  commentTitle: {
    marginBottom: "8px",
    fontSize: "1.6rem",
  },

  commentSub: {
    color: "#cbd5e1",
    marginBottom: "25px",
    fontSize: "0.95rem",
  },

  inputContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    minWidth: "220px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    fontSize: "0.95rem",
  },

  addBtn: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right, #22c55e, #16a34a)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(34,197,94,0.35)",
  },

  commentsList: {
    marginTop: "10px",
  },

  emptyText: {
    color: "#cbd5e1",
    textAlign: "center",
  },

  comment: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "16px",
    marginBottom: "14px",
  },

  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "1rem",
  },

  userName: {
    margin: 0,
    fontSize: "1rem",
  },

  commentText: {
    marginTop: "6px",
    color: "#e2e8f0",
    lineHeight: "1.6",
    fontSize: "0.94rem",
  },
};

export default ResourceDetails;
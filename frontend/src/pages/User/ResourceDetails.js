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
      description: "Complete guide to arrays, stacks, queues, and trees",
    },
    {
      id: 2,
      title: "Operating System Concepts",
      description: "Process management, scheduling, and memory management",
    },
    {
    id: 3,
    title: "DBMS Fundamentals",
    description: "Normalization, SQL queries, and database design",
  },
  {
    id: 4,
    title: "Computer Networks",
    description: "OSI model, TCP/IP, and networking basics",
  },
  {
    id: 5,
    title: "Software Engineering",
    description: "SDLC, Agile methodology, and project management",
  },
  ];

  const resource = resources.find((res) => res.id === parseInt(id));

  const handleAddComment = () => {
    if (comment.trim() === "") return;

    setComments([...comments, comment]);
    setComment("");
  };

  if (!resource) return <h2>Resource not found</h2>;

  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>{resource.title}</h2>
      <p style={styles.description}>{resource.description}</p>

      <button style={styles.downloadBtn}>Download</button>
    </div>

    {/* Discussion Section */}
    <div style={styles.commentSection}>
      <h3>Discussion</h3>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleAddComment} style={styles.addBtn}>
          Add
        </button>
      </div>

      <div style={styles.commentsList}>
        {comments.map((c, index) => (
          <p key={index} style={styles.comment}>
            💬 {c}
          </p>
        ))}
      </div>
    </div>
  </div>
);
}
const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
  },
  card: {
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  title: {
    marginBottom: "10px",
  },
  description: {
    color: "#555",
  },
  downloadBtn: {
    marginTop: "15px",
    padding: "10px 15px",
    backgroundColor: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  commentSection: {
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f1f5f9",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  addBtn: {
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  commentsList: {
    marginTop: "20px",
  },
  comment: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
};

export default ResourceDetails;
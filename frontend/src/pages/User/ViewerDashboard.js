import { useEffect, useState } from "react";
import { getResources } from "../../api/resourceApi";

function ViewerDashboard() {
  console.log("ViewerDashboard Loaded");

  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState(""); // ✅ for "Other"
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getResources();
      console.log("API DATA:", res.data);
      setResources(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 FILTER LOGIC
  const selectedCategory =
    category === "Other" ? customCategory : category;

  const filtered = resources.filter((r) => {
    return (
      r.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "" ||
        r.category
          .toLowerCase()
          .includes(selectedCategory.toLowerCase()))
    );
  });

  // 💬 FETCH COMMENTS
  const fetchComments = async (id) => {
    const res = await fetch(`http://localhost:5000/api/comments/${id}`);
    const data = await res.json();
    setComments(data);
  };

  // 💬 POST COMMENT
  const postComment = async (id) => {
    await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: comment,
        user: JSON.parse(localStorage.getItem("user")).name,
        resourceId: id,
      }),
    });

    setComment("");
    fetchComments(id);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👀 Browse Resources</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* 📂 CATEGORY DROPDOWN */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCustomCategory("");
        }}
        style={styles.input}
      >
        <option value="">All Categories</option>
        <option value="DBMS">DBMS</option>
        <option value="OS">OS</option>
        <option value="CN">CN</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="Other">Other</option>
      </select>

      {/* ✍️ CUSTOM CATEGORY INPUT */}
      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter category..."
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          style={styles.input}
        />
      )}

      {/* 📚 RESOURCE LIST */}
      {filtered.map((res) => {
        console.log("FILE VALUE:", res.file);

        const fileName = res.file.replace(/^uploads\//, "");

        return (
          <div key={res._id} style={styles.card}>
            <h4>{res.title}</h4>
            <p>{res.category}</p>

            {/* ⬇ DOWNLOAD */}
            <a
              href={`http://localhost:5000/uploads/${fileName}`}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              ⬇ Download
            </a>

            {/* 💬 COMMENTS */}
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => fetchComments(res._id)}>
                💬 View Comments
              </button>

              <div>
                {comments.map((c, i) => (
                  <p key={i}>
                    <b>{c.user}:</b> {c.text}
                  </p>
                ))}
              </div>

              <textarea
                placeholder="Write comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={styles.textarea}
              />

              <button onClick={() => postComment(res._id)}>
                Post
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(to right, #eef2ff, #f8fafc)",
  },

  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#1e293b",
  },

  input: {
    padding: "10px",
    width: "260px",
    marginBottom: "15px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },

  card: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
    display: "inline-block",
    marginTop: "6px",
  },

  textarea: {
    width: "100%",
    marginTop: "8px",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
  },

  button: {
    marginTop: "8px",
    marginRight: "8px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },

  comment: {
    background: "#f1f5f9",
    padding: "6px 10px",
    borderRadius: "6px",
    marginTop: "5px",
  },
};
export default ViewerDashboard;
import { useEffect, useState } from "react";
import { getResources } from "../../api/resourceApi";

function ViewerDashboard() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getResources();
      setResources(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchComments = async (id) => {
  const res = await fetch(`http://localhost:5000/api/comments/${id}`);
  const data = await res.json();
  setComments(data);
};

const postComment = async (id) => {
  await fetch("http://localhost:5000/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* RESOURCE LIST */}
      {filtered.map((res) => (
        <div key={res._id} style={styles.card}>
          <h4>{res.title}</h4>
          <p>{res.category}</p>

          <a
            href={`http://localhost:5000/${res.file}`}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Download
          </a>
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
/>

<button onClick={() => postComment(res._id)}>
  Post
</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: "30px" },
  title: { marginBottom: "20px" },

  input: {
    padding: "10px",
    width: "300px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  card: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default ViewerDashboard;
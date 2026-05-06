import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✍️ Contributor Dashboard</h2>

      <div style={styles.actions}>
        <button
          style={styles.button}
          onClick={() => navigate("/upload")}
        >
          ➕ Upload Resource
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/resources")}
        >
          📚 Manage Resources
        </button>
      </div>

      <div style={styles.info}>
        <p>
          You can upload, edit and manage your learning materials here.
        </p>
      </div>
    </div>
  );
}

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

export default Dashboard;
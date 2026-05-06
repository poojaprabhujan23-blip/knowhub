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
  container: { padding: "30px" },
  title: { marginBottom: "20px" },

  actions: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  button: {
    padding: "12px 18px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  info: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "10px",
  },
};

export default Dashboard;
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        {/* TITLE */}
        <h1 style={styles.title}>📚 KnowHub</h1>

        {/* SUBTITLE */}
        <p style={styles.subtitle}>
          Your one-stop platform to upload, explore and manage academic resources easily.
        </p>

        {/* BUTTONS */}
        <div style={styles.buttons}>
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Login
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Register
          </button>
        </div>

        {/* FEATURE CARDS */}
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h4>📤 Upload</h4>
            <p>Share notes & study material</p>
          </div>

          <div style={styles.featureCard}>
            <h4>🔍 Search</h4>
            <p>Find resources instantly</p>
          </div>

          <div style={styles.featureCard}>
            <h4>📥 Download</h4>
            <p>Access files anytime</p>
          </div>
        </div>


        {/* FOOTER */}
        <p style={styles.footer}>
          Built with ❤️ for learning & sharing knowledge
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background:
      "linear-gradient(135deg, #3b82f6, #9333ea, #06b6d4)",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(10px)",
  },

  card: {
    position: "relative",
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.15)",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    width: "400px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "15px",
  },

  features: {
    marginBottom: "20px",
    fontSize: "13px",
    textAlign: "left",
    lineHeight: "1.6",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  loginBtn: {
    width: "48%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#1e293b",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  registerBtn: {
    width: "48%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
  },

  featureCard: {
    background: "rgba(255,255,255,0.2)",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
  },

  howItWorks: {
    marginBottom: "15px",
    fontSize: "13px",
  },

  footer: {
    fontSize: "12px",
    opacity: 0.8,
  },
};

export default Home;
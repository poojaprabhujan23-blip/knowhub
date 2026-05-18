import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logoCircle}>📚</div>

            <div>
              <h1 style={styles.logoText}>KnowHub</h1>
              <p style={styles.tagline}>
                Knowledge Management System
              </p>
            </div>
          </div>

          <div style={styles.navLinks}>
            <span style={styles.navItem}>Home</span>
            <span style={styles.navItem}>Resources</span>
          </div>
        </div>

        {/* HERO */}
        <h2 style={styles.heading}>
          Learn Smarter. Share Faster.
        </h2>

        <p style={styles.subtitle}>
          Upload, discover and collaborate on academic resources
          in one modern platform.
        </p>

        {/* BUTTONS */}
        <div style={styles.buttons}>
          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(168,85,247,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(168,85,247,0.4)";
            }}
          >
            Register
          </button>

          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.2)";
            }}
          >
            Login
          </button>
        </div>

        {/* FEATURES */}
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.icon}>📤</div>
            <p style={styles.featureText}>Upload Notes</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>🔍</div>
            <p style={styles.featureText}>Search Resources</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>💬</div>
            <p style={styles.featureText}>Collaborate</p>
          </div>
        </div>

        {/* FOOTER */}
        <p style={styles.footer}>
          Built with ❤️ for collaborative learning
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
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #7e22ce 100%)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent 40%)",
  },

  card: {
    position: "relative",
    zIndex: 1,
    width: "500px",
    padding: "24px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
    color: "white",
    textAlign: "center",
  },

  /* HEADER */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logoCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "linear-gradient(to right, #3b82f6, #9333ea)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
  },

  logoText: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
  },

  tagline: {
    margin: 0,
    fontSize: "10px",
    color: "#cbd5e1",
  },

  navLinks: {
    display: "flex",
    gap: "10px",
  },

  navItem: {
    fontSize: "12px",
    color: "#e2e8f0",
    padding: "5px 8px",
    borderRadius: "6px",
    background: "rgba(255,255,255,0.06)",
  },

  /* HERO */
  heading: {
    fontSize: "30px",
    marginBottom: "10px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#dbeafe",
    marginBottom: "24px",
  },

  /* BUTTONS */
  buttons: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },

  registerBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right, #a855f7, #7e22ce)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 4px 12px rgba(168,85,247,0.4)",
  },

  loginBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  /* FEATURES */
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
    marginBottom: "18px",
  },

  featureCard: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "14px",
  },

  icon: {
    fontSize: "22px",
    marginBottom: "6px",
  },

  featureText: {
    fontSize: "12px",
    color: "#dbeafe",
  },

  footer: {
    fontSize: "17px",
    color: "#cbd5e1",
  },
};

export default Home;
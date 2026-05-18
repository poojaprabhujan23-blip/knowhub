import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.leftSection}>
          <p style={styles.badge}>
            ✨ Smart Knowledge Management Platform
          </p>

          <h1 style={styles.title}>
            Contributor Dashboard
          </h1>

          <p style={styles.subtitle}>
            Upload resources, manage learning materials and
            support students with quality educational content.
          </p>

          {/* BUTTONS */}
          <div style={styles.actions}>
            <button
              style={styles.primaryBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 12px 25px rgba(59,130,246,0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow =
                  "0 8px 20px rgba(59,130,246,0.35)";
              }}
              onClick={() => navigate("/upload")}
            >
              Upload Resource
            </button>

            <button
              style={styles.secondaryBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 12px 25px rgba(168,85,247,0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow =
                  "0 8px 20px rgba(168,85,247,0.35)";
              }}
              onClick={() => navigate("/resources")}
            >
              Manage Resources
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div style={styles.sideCard}>
          <div style={styles.iconBox}>📘</div>

          <h3 style={styles.cardTitle}>
            Share Knowledge
          </h3>

          <p style={styles.cardText}>
            Make learning easier by sharing notes, PDFs and
            study materials with students.
          </p>

          <div style={styles.stats}>
            <div style={styles.statCard}>
              <h2 style={styles.statNumber}>120+</h2>
              <p style={styles.statText}>Resources</p>
            </div>

            <div style={styles.statCard}>
              <h2 style={styles.statNumber}>80+</h2>
              <p style={styles.statText}>Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📤</div>
          <h3 style={styles.featureTitle}>Easy Uploads</h3>
          <p style={styles.featureText}>
            Upload files quickly with smooth management.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⚡</div>
          <h3 style={styles.featureTitle}>Quick Actions</h3>
          <p style={styles.featureText}>
            Edit and manage resources anytime easily.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🌍</div>
          <h3 style={styles.featureTitle}>Help Students</h3>
          <p style={styles.featureText}>
            Contribute educational content for learners.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    background:
      "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #6d28d9 100%)",
    color: "white",
    boxSizing: "border-box",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    flexWrap: "wrap",
  },

  leftSection: {
    flex: 1,
    minWidth: "300px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.15)",
    marginBottom: "20px",
    color: "#ddd6fe",
    fontSize: "0.9rem",
  },

  title: {
    fontSize: "2.5rem",
    lineHeight: "1.1",
    marginBottom: "18px",
    fontWeight: "700",
  },

  subtitle: {
    maxWidth: "520px",
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
    marginBottom: "30px",
  },

  actions: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 26px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(to right, #3b82f6, #2563eb)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
  },

  secondaryBtn: {
    padding: "14px 26px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(to right, #a855f7, #7c3aed)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 8px 20px rgba(168,85,247,0.35)",
  },

  sideCard: {
    width: "100%",
    maxWidth: "340px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "28px",
    padding: "28px",
    backdropFilter: "blur(16px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    boxSizing: "border-box",
  },

  iconBox: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },

  cardTitle: {
    fontSize: "1.3rem",
    marginBottom: "10px",
  },

  cardText: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginBottom: "25px",
    fontSize: "0.9rem",
  },

  stats: {
    display: "flex",
    gap: "15px",
  },

  statCard: {
    flex: 1,
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "18px",
    textAlign: "center",
  },

  statNumber: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#ffffff",
  },

  statText: {
    marginTop: "5px",
    color: "#cbd5e1",
    fontSize: "0.8rem",
  },

  features: {
    marginTop: "60px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

  featureCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "24px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },

  featureIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.8rem",
    marginBottom: "18px",
  },

  featureTitle: {
    fontSize: "1.05rem",
    marginBottom: "10px",
  },

  featureText: {
    color: "#cbd5e1",
    fontSize: "0.88rem",
    lineHeight: "1.6",
  },
};

export default Dashboard;
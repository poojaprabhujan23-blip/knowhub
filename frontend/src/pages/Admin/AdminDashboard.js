import { useEffect, useState } from "react";
import { getResources } from "../../api/resourceApi";

function AdminDashboard() {
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [openBook, setOpenBook] = useState(null);

  useEffect(() => {
    fetchResources();
    fetchUsers();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getResources();
      setResources(res.data || []);
    } catch (error) {
      console.log(error);
      setResources([]);
    }
  };

  // ✅ ONLY FIXED PART (USERS HANDLING)
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/users"
      );

      const data = await res.json();

      // FIX: support all backend formats safely
      const usersList = Array.isArray(data)
        ? data
        : data.users || data.data || [];

      setUsers(usersList);
    } catch (error) {
      console.log(error);
      setUsers([]);
    }
  };

  const books = [
    {
      id: "analytics",
      title: "Analytics Intelligence",
      subtitle: "System performance & insights",
      description:
        "Explore how your platform is performing with real-time insights and system analytics.",
      color1: "#3b82f6",
      color2: "#8b5cf6",
      icon: "📊",
    },

    {
      id: "users",
      title: "User Universe",
      subtitle: "People, roles & activity",
      description:
        "Manage users, monitor activity and understand platform engagement.",
      color1: "#22c55e",
      color2: "#16a34a",
      icon: "👥",
    },

    {
      id: "resources",
      title: "Knowledge Archive",
      subtitle: "All learning materials",
      description:
        "Access all uploaded resources and organized knowledge base.",
      color1: "#f59e0b",
      color2: "#f97316",
      icon: "📚",
    },
  ];

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>
          📚 KnowHub Admin Dashboard
        </h1>

        <p style={styles.subTitle}>
          Monitor platform intelligence, users and resources
        </p>
      </div>

      {/* BOOK SHELF */}
      <div style={styles.shelf}>
        {books.map((b) => (
          <div
            key={b.id}
            onClick={() => setOpenBook(b.id)}
            style={{
              ...styles.book,
              background: `linear-gradient(135deg, ${b.color1}, ${b.color2})`,
            }}
          >
            <div style={styles.bookTop}>
              <span style={styles.icon}>{b.icon}</span>
              <span style={styles.tag}>OPEN</span>
            </div>

            <h3 style={styles.bookTitle}>{b.title}</h3>
            <p style={styles.bookSubtitle}>{b.subtitle}</p>
            <p style={styles.bookDesc}>{b.description}</p>

            <div style={styles.footerHint}>Click to open →</div>
          </div>
        ))}
      </div>

      {/* OPEN BOOK */}
      {openBook && (
        <div style={styles.reader}>
          <button
            style={styles.closeBtn}
            onClick={() => setOpenBook(null)}
          >
            ✕ Close
          </button>

          <h2 style={styles.welcome}>
            👋 Welcome to KnowHub Insights
          </h2>

          <p style={styles.subWelcome}>
            Smart analytics and management tools
          </p>

          {/* ANALYTICS */}
          {openBook === "analytics" && (
            <div style={styles.section}>
              <h3>📊 Platform Analytics</h3>

              <div style={styles.analyticsTable}>
                <div style={styles.analyticsRow}>
                  <span>Total Users</span>
                  <span style={styles.analyticsValue}>
                    {Array.isArray(users) ? users.length : 0}
                  </span>
                </div>

                <div style={styles.analyticsRow}>
                  <span>Total Resources</span>
                  <span style={styles.analyticsValue}>
                    {Array.isArray(resources) ? resources.length : 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* USERS */}
          {openBook === "users" && (
            <div style={styles.section}>
              <h3>👥 User Directory</h3>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Array.isArray(users) &&
                      users.map((u) => (
                        <tr key={u._id}>
                          <td style={styles.td}>{u.name}</td>
                          <td style={styles.td}>{u.email}</td>
                          <td style={styles.td}>
                            <span style={styles.badge}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RESOURCES */}
          {openBook === "resources" && (
            <div style={styles.section}>
              <h3>📚 Resource Archive</h3>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Title</th>
                      <th style={styles.th}>Category</th>
                    </tr>
                  </thead>

                  <tbody>
                    {resources.map((r) => (
                      <tr key={r._id}>
                        <td style={styles.td}>
                          {r.title || "Untitled"}
                        </td>
                        <td style={styles.td}>
                          <span style={styles.resourceBadge}>
                            {r.category || "General"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "35px",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    background:
      "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #6d28d9 100%)",
    color: "white",
  },

  header: {
    marginBottom: "35px",
  },

  mainTitle: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontWeight: "700",
  },

  subTitle: {
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
    maxWidth: "700px",
  },

  shelf: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },

  book: {
    padding: "24px",
    borderRadius: "24px",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
    transition: "0.3s",
    border:
      "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
  },

  bookTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    alignItems: "center",
  },

  icon: {
    fontSize: "28px",
  },

  tag: {
    fontSize: "11px",
    background: "rgba(255,255,255,0.20)",
    padding: "5px 12px",
    borderRadius: "999px",
    fontWeight: "600",
  },

  bookTitle: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "700",
  },

  bookSubtitle: {
    fontSize: "14px",
    marginTop: "8px",
    color: "#f1f5f9",
  },

  bookDesc: {
    fontSize: "13px",
    marginTop: "15px",
    lineHeight: "1.7",
    color: "#e2e8f0",
  },

  footerHint: {
    marginTop: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  reader: {
    marginTop: "35px",
    background: "rgba(255,255,255,0.10)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(14px)",
    padding: "30px",
    borderRadius: "26px",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.25)",
  },

  closeBtn: {
    float: "right",
    border: "none",
    background:
      "linear-gradient(to right, #ef4444, #dc2626)",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow:
      "0 6px 16px rgba(239,68,68,0.35)",
  },

  welcome: {
    marginBottom: "8px",
    fontSize: "2rem",
    fontWeight: "700",
  },

  subWelcome: {
    color: "#cbd5e1",
    marginBottom: "25px",
    lineHeight: "1.7",
  },

  infoText: {
    color: "#cbd5e1",
    fontSize: "14px",
    marginBottom: "15px",
    lineHeight: "1.6",
  },

  section: {
    marginTop: "18px",
  },

  badge: {
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  tableWrapper: {
    overflowX: "auto",
    marginTop: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "16px",
    overflow: "hidden",
  },

  th: {
    textAlign: "left",
    padding: "16px",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
  },

  td: {
    padding: "16px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    color: "#e2e8f0",
    fontSize: "14px",
  },

  analyticsTable: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  analyticsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    padding: "18px",
    borderRadius: "14px",
    fontSize: "15px",
  },

  analyticsValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
  },

  resourceBadge: {
    background:
      "linear-gradient(to right, #f59e0b, #f97316)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default AdminDashboard;
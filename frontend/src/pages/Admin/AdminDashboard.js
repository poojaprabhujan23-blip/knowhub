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
    const res = await getResources();
    setResources(res.data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/auth/users");
    const data = await res.json();
    setUsers(data);
  };

  const roleCount = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  // 📚 More realistic book system
  const books = [
    {
      id: "analytics",
      title: "Analytics Intelligence",
      subtitle: "System performance & insights",
      description:
        "Explore how your platform is performing with real-time insights and system health tracking.",
      color1: "#4f46e5",
      color2: "#818cf8",
      icon: "📊",
    },
    {
      id: "users",
      title: "User Universe",
      subtitle: "People, roles & activity",
      description:
        "Manage and understand your users, their roles, and engagement inside KnowHub.",
      color1: "#22c55e",
      color2: "#86efac",
      icon: "👥",
    },
    {
      id: "resources",
      title: "Knowledge Archive",
      subtitle: "All stored learning materials",
      description:
        "Access and manage all uploaded resources, categorized knowledge, and content base.",
      color1: "#f59e0b",
      color2: "#fcd34d",
      icon: "📚",
    },
  ];

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>📚 KnowHub Knowledge Library</h1>
        <p>Click a book to open insights, analytics & structured data</p>
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

      {/* OPEN BOOK VIEW */}
      {openBook && (
        <div style={styles.reader}>

          <button style={styles.closeBtn} onClick={() => setOpenBook(null)}>
            ✕ Close Book
          </button>

          <h2 style={styles.welcome}>👋 Welcome to KnowHub Insights</h2>
          <p style={styles.subWelcome}>
            This book contains structured intelligence from your system.
          </p>

          {/* ANALYTICS */}
          {openBook === "analytics" && (
            <div style={styles.section}>
              <h3>📊 System Intelligence Report</h3>

              <div style={styles.grid}>
                <div style={styles.card}>
                  <h4>Total Users</h4>
                  <p>{users.length}</p>
                </div>

                <div style={styles.card}>
                  <h4>Total Resources</h4>
                  <p>{resources.length}</p>
                </div>
                </div>
              </div>
          )}

          {/* USERS */}
          {openBook === "users" && (
            <div style={styles.section}>
              <h3>👥 User Intelligence Directory</h3>

              <p style={styles.infoText}>
                Total Roles Breakdown: Admins, Contributors & Viewers in your system.
              </p>

              {users.map((u) => (
                <div key={u._id} style={styles.row}>
                  <div>
                    <strong>{u.name}</strong>
                    <p style={styles.muted}>{u.email}</p>
                  </div>
                  <span style={styles.badge}>{u.role}</span>
                </div>
              ))}
            </div>
          )}

          {/* RESOURCES */}
          {openBook === "resources" && (
            <div style={styles.section}>
              <h3>📚 Knowledge Archive</h3>

              <p style={styles.infoText}>
                All uploaded learning resources and categorized knowledge base.
              </p>

              {resources.map((r) => (
                <div key={r._id} style={styles.row}>
                  <div>
                    <strong>{r.title || "Untitled Resource"}</strong>
                    <p style={styles.muted}>{r.category || "General"}</p>
                  </div>
                </div>
              ))}
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
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
  },

  header: {
    marginBottom: "25px",
  },

  shelf: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },

  book: {
    padding: "22px",
    borderRadius: "18px",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  bookTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  icon: {
    fontSize: "22px",
  },

  tag: {
    fontSize: "10px",
    background: "rgba(255,255,255,0.25)",
    padding: "3px 8px",
    borderRadius: "999px",
  },

  bookTitle: {
    margin: "0",
  },

  bookSubtitle: {
    fontSize: "13px",
    opacity: 0.9,
    marginTop: "5px",
  },

  bookDesc: {
    fontSize: "12px",
    opacity: 0.85,
    marginTop: "10px",
    lineHeight: "1.4",
  },

  footerHint: {
    marginTop: "15px",
    fontSize: "11px",
    opacity: 0.8,
  },

  reader: {
    marginTop: "25px",
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
  },

  closeBtn: {
    float: "right",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  welcome: {
    marginBottom: "5px",
  },

  subWelcome: {
    color: "#6b7280",
    marginBottom: "20px",
  },

  infoText: {
    color: "#6b7280",
    fontSize: "13px",
    marginBottom: "10px",
  },

  section: {
    marginTop: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
  },

  card: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  muted: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0,
  },

  badge: {
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
  },
};

export default AdminDashboard;
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      {/* LOGO / TITLE */}
      <h2
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        ✨ KnowHub
      </h2>

      {/* NAV LINKS */}
      <div style={styles.links}>
        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              style={styles.outlineBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            {/* 👑 ADMIN */}
            {user.role === "admin" && (
              <>
                <button
                  style={styles.primaryBtn}
                  onClick={() => navigate("/admin")}
                >
                  Admin Dashboard
                </button>

                <button
                  style={styles.outlineBtn}
                  onClick={() => navigate("/resources")}
                >
                  All Resources
                </button>
              </>
            )}

            {/* ✍️ CONTRIBUTOR */}
            {user?.role?.toLowerCase() ===
              "contributor" && (
              <>
                <button
                  style={styles.primaryBtn}
                  onClick={() =>
                    navigate("/dashboard")
                  }
                >
                  Dashboard
                </button>

                <button
                  style={styles.secondaryBtn}
                  onClick={() =>
                    navigate("/upload")
                  }
                >
                  Upload Resource
                </button>

                <button
                  style={styles.outlineBtn}
                  onClick={() =>
                    navigate("/resources")
                  }
                >
                  My Resources
                </button>
              </>
            )}

            {/* 👀 VIEWER */}
            {user.role === "viewer" && (
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/viewer")}
              >
                Browse Resources
              </button>
            )}

            {/* USER NAME */}
            <span style={styles.user}>
              👤 {user.name} ({user.role})
            </span>

            {/* LOGOUT */}
            <button
              style={styles.logout}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const commonButton = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: "0.3s ease",
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 35px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #581c87 100%)",
    color: "white",
    borderBottom:
      "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },

  logo: {
    cursor: "pointer",
    fontSize: "1.8rem",
    fontWeight: "700",
    background:
      "linear-gradient(to right, #60a5fa, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
  },

  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    ...commonButton,
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    color: "white",
  },

  secondaryBtn: {
    ...commonButton,
    background:
      "linear-gradient(to right, #22c55e, #16a34a)",
    color: "white",
  },

  outlineBtn: {
    ...commonButton,
    background: "rgba(255,255,255,0.08)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(10px)",
  },

  logout: {
    ...commonButton,
    background:
      "linear-gradient(to right, #ef4444, #dc2626)",
    color: "white",
  },

  user: {
    fontSize: "14px",
    padding: "10px 16px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e2e8f0",
    fontWeight: "500",
  },
};

export default Navbar;
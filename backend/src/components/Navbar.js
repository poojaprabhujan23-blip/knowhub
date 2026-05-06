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
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        KnowHub 🚀
      </h2>

      {/* NAV LINKS */}
      <div style={styles.links}>
        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <button style={styles.btn} onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              style={styles.btnOutline}
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
                  style={styles.btn}
                  onClick={() => navigate("/admin")}
                >
                  Admin Dashboard
                </button>

                <button
                  style={styles.btnOutline}
                  onClick={() => navigate("/resources")}
                >
                  All Resources
                </button>
              </>
            )}

            {/* ✍️ CONTRIBUTOR */}
            {user?.role?.toLowerCase() === "contributor" && (
  <>
    <button onClick={() => navigate("/dashboard")}>
      Dashboard
    </button>

    <button onClick={() => navigate("/upload")}>
      Upload Resource
    </button>

    <button onClick={() => navigate("/resources")}>
      My Resources
    </button>
  </>
)}

            {/* 👀 VIEWER */}
            {user.role === "viewer" && (
              <button
                style={styles.btn}
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
            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1e293b",
    color: "white",
  },

  logo: {
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  btn: {
    padding: "8px 14px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  btnOutline: {
    padding: "8px 14px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  logout: {
    padding: "8px 14px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  user: {
    fontSize: "14px",
    marginLeft: "10px",
  },
};

export default Navbar;
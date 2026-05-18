import { useState, useContext } from "react";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  // ✅ DEFAULT ROLE FIXED
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "viewer",
  });

  // ✅ HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      console.log(res.data);

      // ✅ SAFETY CHECK
      if (!res.data.user) {
        alert("User data not found");
        return;
      }

      // ✅ STORE USER
      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful!");

      const role = res.data.user.role;

      // ✅ ROLE BASED NAVIGATION
      if (role === "admin") {
        navigate("/admin");

      } else if (role === "contributor") {
        navigate("/dashboard");

      } else {
        navigate("/viewer");
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >
        {/* LOGO */}
        <div style={styles.logo}>
          📚
        </div>

        {/* HEADING */}
        <h2 style={styles.heading}>
          Welcome Back
        </h2>

        <p style={styles.subText}>
          Login to continue exploring KnowHub
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          style={styles.input}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          style={styles.input}
          required
        />

        {/* ROLE */}
        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          style={styles.select}
        >
          <option value="viewer">
            Viewer
          </option>

          <option value="contributor">
            Contributor
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        {/* FORGOT PASSWORD */}
        <p
          style={styles.forgot}
          onClick={() =>
            navigate("/forgot-password")
          }
        >
          Forgot Password?
        </p>

        {/* BUTTON */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.boxShadow =
              "0 0 22px rgba(168,85,247,0.8)";

            e.target.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow =
              "0 6px 18px rgba(168,85,247,0.4)";

            e.target.style.transform =
              "translateY(0px)";
          }}
        >
          Login
        </button>

        {/* FOOTER */}
        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #6d28d9 100%)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 40%)",
  },

  form: {
    position: "relative",
    zIndex: 1,
    width: "360px",
    padding: "32px",
    borderRadius: "24px",
    background: "rgba(15, 23, 42, 0.88)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.35)",
    textAlign: "center",
    color: "white",
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "16px",
    margin: "0 auto 18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    background:
      "linear-gradient(to right, #3b82f6, #9333ea)",
    boxShadow:
      "0 0 20px rgba(147,51,234,0.5)",
  },

  heading: {
    marginBottom: "6px",
    fontSize: "30px",
    fontWeight: "700",
    color: "#ffffff",
  },

  subText: {
    marginBottom: "24px",
    fontSize: "14px",
    color: "#e2e8f0",
  },

  input: {
    width: "100%",
    padding: "13px",
    margin: "10px 0",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.15)",
    background:
      "rgba(255,255,255,0.12)",
    color: "#ffffff",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  select: {
    width: "100%",
    padding: "13px",
    margin: "10px 0",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.15)",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
    cursor: "pointer",
  },

  forgot: {
    textAlign: "right",
    fontSize: "13px",
    color: "#c4b5fd",
    cursor: "pointer",
    marginTop: "6px",
    marginBottom: "14px",
  },

  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    background:
      "linear-gradient(to right, #8b5cf6, #7c3aed)",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow:
      "0 6px 18px rgba(168,85,247,0.4)",
  },

  footer: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#e2e8f0",
  },

  link: {
    color: "#c4b5fd",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
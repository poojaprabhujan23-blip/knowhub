import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      alert("Registration successful!");
      navigate("/login");

      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* LOGO */}
        <div style={styles.logo}>✨</div>

        {/* HEADING */}
        <h2 style={styles.heading}>Create Account</h2>

        <p style={styles.subText}>
          Join KnowHub and start sharing knowledge
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          style={styles.input}
        />

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
          <option value="viewer">Viewer</option>
          <option value="contributor">Contributor</option>
          <option value="admin">Admin</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.boxShadow =
              "0 0 22px rgba(168,85,247,0.8)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow =
              "0 6px 18px rgba(168,85,247,0.4)";
            e.target.style.transform = "translateY(0px)";
          }}
        >
          Register
        </button>

        {/* FOOTER */}
        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
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
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
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
    background: "linear-gradient(to right, #3b82f6, #9333ea)",
    boxShadow: "0 0 20px rgba(147,51,234,0.5)",
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
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.12)",
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
    border: "1px solid rgba(255,255,255,0.15)",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "13px",
    marginTop: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 6px 18px rgba(168,85,247,0.4)",
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

export default Register; 
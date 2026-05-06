import { useState, useContext } from "react";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      console.log("USER:", res.data.user);

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      const role = res.data.user.role;

if (role === "admin") {
  navigate("/admin");
} else if (role === "contributor") {
  navigate("/dashboard");
} else {
  navigate("/viewer");
}
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Welcome Back </h2>
        <p style={styles.subText}>Login to your account</p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          style={styles.input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={styles.input}
        />

         <select
  value={formData.role}
  onChange={(e) =>
    setFormData({ ...formData, role: e.target.value })
  }
  style={styles.input}
>
  <option value="viewer">Viewer</option>
  <option value="contributor">Contributor</option>
  <option value="admin">Admin</option>
</select>


        {/* FORGOT PASSWORD */}
        <p
          style={styles.forgot}
          onClick={() => navigate("/forgot")
          }
        >
          Forgot Password?
        </p>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#334155")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#1e293b")
          }
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #e2e8f0, #f8fafc)",
  },

  form: {
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "5px",
    color: "#1e293b",
  },

  subText: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#64748b",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },

  forgot: {
    textAlign: "right",
    fontSize: "13px",
    color: "#3b82f6",
    cursor: "pointer",
    marginBottom: "10px",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    transition: "0.2s",
  },

  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#64748b",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
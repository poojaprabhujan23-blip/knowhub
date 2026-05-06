import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); // ✅ navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);
      alert("Registration successful!");

      // ✅ redirect to login
      navigate("/login");

      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create Account 🚀</h2>
        <p style={styles.subText}>Register to get started</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          style={styles.input}
        />

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

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")} // ✅ FIXED
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

export default Register;
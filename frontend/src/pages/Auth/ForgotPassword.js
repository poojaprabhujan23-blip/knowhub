import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";

function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword(form);

      alert(res.data.message);

      navigate("/login");

    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Password reset failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={styles.box}
      >
        <h2 style={styles.heading}>
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="New password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({
              ...form,
              newPassword:
                e.target.value,
            })
          }
          style={styles.input}
          required
        />

        <button
          type="submit"
          style={styles.button}
        >
          Reset Password
        </button>

        <p
          style={styles.link}
          onClick={() =>
            navigate("/login")
          }
        >
          Back to Login
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
      "linear-gradient(135deg, #020617, #1e1b4b, #6d28d9)",
    fontFamily: "Poppins, sans-serif",
  },

  box: {
    width: "320px",
    padding: "28px",
    borderRadius: "20px",
    background:
      "rgba(15, 23, 42, 0.9)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    textAlign: "center",
    color: "white",
  },

  heading: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "700",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border:
      "1px solid rgba(255,255,255,0.2)",
    background:
      "rgba(255,255,255,0.1)",
    color: "white",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(to right, #8b5cf6, #7c3aed)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    fontSize: "14px",
  },

  link: {
    fontSize: "13px",
    color: "#c4b5fd",
    cursor: "pointer",
    marginTop: "6px",
  },
};

export default ForgotPassword;
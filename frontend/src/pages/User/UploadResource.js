import { useState } from "react";
import { addResource } from "../../api/resourceApi";

function UploadResource() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  const [customCategory, setCustomCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);

    const finalCategory =
      formData.category === "OTHER"
        ? customCategory
        : formData.category;

    data.append("category", finalCategory);
    data.append("file", formData.file);

    try {
      await addResource(data);

      alert("✅ Resource uploaded!");

      setFormData({
        title: "",
        description: "",
        category: "",
        file: null,
      });

      setCustomCategory("");
    } catch (error) {
      console.log(error);
      alert("❌ Upload failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.iconBox}>📤</div>

        <h2 style={styles.heading}>Upload Resource</h2>

        <p style={styles.subText}>
          Share notes, PDFs and educational materials with
          students through KnowHub.
        </p>

        {/* TITLE */}
        <label style={styles.label}>Title</label>

        <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          style={styles.input}
        />

        {/* DESCRIPTION */}
        <label style={styles.label}>Description</label>

        <textarea
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          style={styles.textarea}
        />

        {/* CATEGORY */}
        <label style={styles.label}>Category</label>

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          style={styles.select}
        >
          <option value="">Select Category</option>
          <option value="DBMS">DBMS</option>
          <option value="OS">Operating Systems</option>
          <option value="CN">Computer Networks</option>
          <option value="DSA">Data Structures</option>
          <option value="ML">Machine Learning</option>
          <option value="OTHER">Other</option>
        </select>

        {/* CUSTOM CATEGORY */}
        {formData.category === "OTHER" && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(e.target.value)
            }
            style={styles.input}
          />
        )}

        {/* FILE */}
        <label style={styles.label}>Upload File</label>

        <input
          type="file"
          onChange={(e) =>
            setFormData({
              ...formData,
              file: e.target.files[0],
            })
          }
          style={styles.file}
        />

        {/* BUTTON */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow =
              "0 12px 25px rgba(59,130,246,0.45)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px)";
            e.target.style.boxShadow =
              "0 8px 20px rgba(59,130,246,0.35)";
          }}
        >
          Upload Resource 🚀
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "30px",
    background:
      "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #6d28d9 100%)",
    fontFamily: "'Poppins', sans-serif",
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
    width: "100%",
    maxWidth: "430px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    borderRadius: "28px",
    padding: "35px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
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
    fontSize: "30px",
    margin: "0 auto 18px",
    boxShadow: "0 0 25px rgba(139,92,246,0.45)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "8px",
    color: "white",
    fontSize: "2rem",
    fontWeight: "700",
  },

  subText: {
    textAlign: "center",
    color: "#cbd5e1",
    marginBottom: "25px",
    fontSize: "0.92rem",
    lineHeight: "1.6",
  },

  label: {
    fontSize: "0.92rem",
    marginBottom: "6px",
    color: "#e2e8f0",
    fontWeight: "500",
  },

  input: {
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    fontSize: "0.95rem",
  },

  select: {
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "white",
    color: "#111827",
    outline: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
  },

  textarea: {
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    minHeight: "90px",
    resize: "none",
    fontSize: "0.95rem",
  },

  file: {
    marginBottom: "24px",
    color: "#e2e8f0",
    fontSize: "0.92rem",
  },

  button: {
    padding: "14px",
    background:
      "linear-gradient(to right, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "0.3s",
    boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
  },
};

export default UploadResource;
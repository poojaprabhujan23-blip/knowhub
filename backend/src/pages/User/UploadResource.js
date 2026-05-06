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

    // ✅ FINAL CATEGORY VALUE
    const finalCategory =
      formData.category === "OTHER"
        ? customCategory
        : formData.category;

    data.append("category", finalCategory);
    data.append("file", formData.file);

    try {
      await addResource(data);
      alert("✅ Resource uploaded!");

      // reset form
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
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>📤 Upload Resource</h2>

        {/* TITLE */}
        <label style={styles.label}>Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
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
          style={styles.input}
        >
          <option value="">Select Category</option>
          <option value="DBMS">DBMS</option>
          <option value="OS">Operating Systems</option>
          <option value="CN">Computer Networks</option>
          <option value="DSA">Data Structures</option>
          <option value="ML">Machine Learning</option>
          <option value="OTHER">Other</option>
        </select>

        {/* 👇 SHOW ONLY IF OTHER */}
        {formData.category === "OTHER" && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
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
        <button type="submit" style={styles.button}>
          Upload 🚀
        </button>
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
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e293b",
  },

  label: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#475569",
  },

  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
  },

  textarea: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    minHeight: "80px",
  },

  file: {
    marginBottom: "20px",
  },

  button: {
    padding: "12px",
    backgroundColor: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default UploadResource;
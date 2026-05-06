import { useEffect, useState } from "react";
import {
  getResources,
  deleteResource,
  updateResource,
} from "../../api/resourceApi";

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  // ✅ Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getResources();
        setResources(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      setResources((prev) =>
        prev.filter((res) => res._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Edit start
  const handleEdit = (res) => {
    setEditId(res._id);
    setEditData({
      title: res.title,
      description: res.description,
    });
  };

  // ✅ Update
  const handleUpdate = async (id) => {
    try {
      const res = await updateResource(id, editData);

      setResources((prev) =>
        prev.map((item) =>
          item._id === id ? res.data : item
        )
      );

      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Resources</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 🎯 FILTER */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={styles.filter}
      >
        <option value="All">All</option>
        <option value="DBMS">DBMS</option>
        <option value="OS">OS</option>
        <option value="CN">CN</option>
      </select>

      <div style={styles.grid}>
        {resources.length === 0 ? (
          <p>No resources available</p>
        ) : (
          resources
            .filter((res) =>
              filter === "All"
                ? true
                : res.category === filter
            )
            .filter((res) =>
              res.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((res) => (
              <div key={res._id} style={styles.card}>
                {editId === res._id ? (
                  <>
                    {/* EDIT MODE */}
                    <input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          title: e.target.value,
                        })
                      }
                      style={styles.input}
                    />

                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      style={styles.input}
                    />

                    <button
                      onClick={() => handleUpdate(res._id)}
                      style={styles.saveBtn}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {/* VIEW MODE */}
                    <h3>{res.title}</h3>
                    <p>{res.description}</p>

                    <p>
                      <b>Category:</b> {res.category}
                    </p>

                    {res.file && (
                      <a
                        href={`http://localhost:5000/uploads/${res.file}`}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        Download PDF
                      </a>
                    )}

                    <button
                      onClick={() => handleEdit(res)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(res._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    padding: "20px",
  },
  search: {
    padding: "8px",
    marginBottom: "10px",
    width: "200px",
  },
  filter: {
    marginBottom: "20px",
    padding: "5px",
    marginLeft: "10px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
  border: "none",
  padding: "15px",
  width: "260px",
  borderRadius: "12px",
  backgroundColor: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
},
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "5px",
  },
  link: {
    display: "block",
    marginTop: "10px",
    color: "blue",
  },
 editBtn: {
  marginTop: "10px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s",
},

deleteBtn: {
  marginTop: "10px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s",
},
  saveBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ResourceList;
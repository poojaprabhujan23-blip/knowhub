import { useEffect, useState } from "react";

import { getResources } from "../../api/resourceApi";

function AdminDashboard() {
  const [resources, setResources] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getResources();
      setResources(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const fetchUsers = async () => {
  const res = await fetch("http://localhost:5000/api/auth/users");
  const data = await res.json();
  setUsers(data);
};

useEffect(() => {
  fetchUsers();
}, []);

<h3>👥 Users</h3>

{users.map((u) => (
  <div key={u._id}>
    <p>{u.name} - {u.role}</p>
  </div>
))}

  return (
    
    <div style={styles.container}>
      <h2 style={styles.title}>👑 Admin Dashboard</h2>

        <h3>📊 Analytics</h3>

         <p>Total Resources: {resources.length}</p>
        <p>Total Users: 10</p>
        <p>Top Contributor: Demo User</p>
        <p>Most Viewed: Sample Resource</p>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>📊 Total Resources</h3>
          <p>{resources.length}</p>
        </div>

        <div style={styles.card}>
          <h3>⚙️ System</h3>
          <p>Manage categories & settings</p>
        </div>

        <div style={styles.card}>
          <h3>📈 Activity</h3>
          <p>Basic analytics overview</p>
        </div>
      </div>
    </div>
    
  );
}

const styles = {
  container: { padding: "30px" },
  title: { marginBottom: "20px" },

  grid: {
    display: "flex",
    gap: "20px",
  },

  card: {
    flex: 1,
    background: "#f1f5f9",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
  },
};

export default AdminDashboard;
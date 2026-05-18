import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("TOKEN FROM URL:", token); // DEBUG

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:3000/auth";

const UserManage = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      is_active: true,
      is_superuser: false,
    },
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  // 🔑 Check token via backend
  useEffect(() => {
    async function checkAccess() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("⚠️ Please log in first!");
          Navigate("/login");
          return;
        }

        const res = await axios.get(`${API_BASE}/check-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data.role) {
          alert("⛔ Access denied: Only superusers can access User Management!");
          Navigate("/dashboard");
        }
      } catch (err) {
        alert(
          `❌ Token check failed: ${err.response?.data?.detail || err.message}`
        );
        Navigate("/login");
      }
    }

    checkAccess();
  }, [Navigate]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert(
        `❌ Error fetching users: ${err.response?.data?.detail || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create user
  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_BASE}/signup`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      reset();
      fetchUsers();
      alert("✅ User created successfully");
    } catch (err) {
      alert(
        `❌ Error creating user: ${err.response?.data?.detail || err.message}`
      );
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
      alert("✅ User deleted successfully");
    } catch (err) {
      alert(
        `❌ Error deleting user: ${err.response?.data?.detail || err.message}`
      );
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("🚪 Logged out successfully");
    Navigate("/login");
  };

  // ✅ Back to Dashboard
  const backToDashboard = () => {
    Navigate("/db");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header with navigation buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👥 User Management</h1>
        <div className="space-x-3">
          <button
            onClick={backToDashboard}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Create User Form */}
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white shadow-md rounded-lg p-6"
      >
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          {...register("hashed_password", { required: true })}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 text-blue-500"
            />
            <span>Active</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("is_superuser")}
              className="h-4 w-4 text-blue-500"
            />
            <span>Superuser</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </form>

      {/* User List */}
      <h2 className="text-2xl font-bold mt-8 mb-4">User List</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users available.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center"
            >
              <div>
                <span className="font-semibold text-lg">{user.username}</span>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-sm text-gray-500">
                  {user.is_active ? "Active" : "Inactive"} •{" "}
                  {user.is_superuser ? "Superuser" : "Normal User"}
                </div>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManage;

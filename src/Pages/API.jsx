import React from 'react';
import axios from 'axios';

const API = () => {
  const ct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get("http://localhost:3000/auth/check-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Token valid:", res.data);
      alert(`Hello ${res.data.user}, your token is valid!`);

    } catch (err) {
      console.error("❌ Token check failed:", err.response?.data || err.message);
      alert("Token is invalid or expired. Please login again.");
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={ct} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Token
      </button>
    </div>
  );
};

export default API;

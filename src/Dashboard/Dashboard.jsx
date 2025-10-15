import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const Navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const { register, handleSubmit } = useForm();
  const [reviews, setReviews] = useState([]);
  const reviewform = useForm();
  const imageform = useForm();
  const [images, setImages] = useState([]);
  const [isSuperUser, setIsSuperUser] = useState(false);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    Navigate("/login");
  };

  // ✅ Navigate to Manage Users
  const goToUserManage = () => {
    Navigate("/manageUser");
  };

  const HandleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/image/images/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        alert("Image deleted successfully");
        setImages(images.filter((img) => img.id !== id));
      }
    } catch (err) {
      alert("Error deleting image");
    }
  };

  const ImgSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);

      const res = await axios.post(
        "http://localhost:3000/image/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Image uploaded successfully");
      }
    } catch (err) {
      alert("Error uploading image");
    }
  };

  const HandleAbout = async (data) => {
    const res = await axios.post("http://localhost:3000/about", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status === 200) alert("About Us updated successfully");
    else alert("Error updating About Us");
  };

  const HandelReview = async (data) => {
    const res = await axios.post("http://localhost:3000/reviews", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status === 200) {
      alert("Review added successfully");
      window.location.reload();
    } else alert("Error adding Review");
  };

  const HandleChoose = async (data) => {
    const res = await axios.post("http://localhost:3000/choose", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status === 200) alert("Why Choose Us updated successfully");
    else alert("Error updating Why Choose Us");
  };

  const HandleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/contact/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status === 200) {
      alert("Query deleted successfully");
      setQueries(queries.filter((q) => q.id !== id));
    }
  };

  const HandleDeleteReview = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 200) {
        alert("Review deleted successfully");
        setReviews(reviews.filter((r) => r.id !== id));
      }
    } catch (err) {
      alert("Error deleting review");
    }
  };

  // ✅ Auth check & role validation
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:3000/auth/check-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setIsSuperUser(res.data.role === true);
        } else {
          Navigate("/login");
        }
      } catch (err) {
        alert("Auth check failed, please login again.");
        Navigate("/login");
      }
    }
    checkAuth();
  }, [Navigate]);

  // ✅ Fetch Queries
  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await axios.get("http://localhost:3000/contact/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.status === 200) setQueries(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQueries();
  }, []);

  // ✅ Fetch Reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get("http://localhost:3000/reviews", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.status === 200) setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReviews();
  }, []);

  // ✅ Fetch Images
  useEffect(() => {
    async function fetchImages() {
      const res = await axios.get("http://localhost:3000/image/images");
      if (res.status === 200) setImages(res.data);
    }
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Admin Dashboard</h1>
          <p className="text-gray-600">Manage queries, reviews, and content</p>
        </div>
        <div className="space-x-3">
          {isSuperUser && (
            <button
              onClick={goToUserManage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              👥 Manage Users
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* --- Queries --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📨 Recent Queries</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {queries.length ? (
              queries.map((q) => (
                <form
                  key={q.id}
                  className="border p-3 rounded hover:shadow transition"
                >
                  <p className="font-semibold">{q.name}</p>
                  <p className="text-sm text-gray-500">{q.email}</p>
                  <p className="text-sm text-gray-500">{q.number}</p>
                  <p className="mt-1">{q.category}</p>
                  <p className="mt-1">{q.message}</p>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => HandleDelete(q.id)}
                  >
                    Delete
                  </button>
                </form>
              ))
            ) : (
              <p className="text-gray-500">No queries yet.</p>
            )}
          </div>
        </div>

        {/* About Us */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">🏢 Update About Us</h2>
          <form className="space-y-3" onSubmit={handleSubmit(HandleAbout)}>
            <textarea
              placeholder="Enter About Us text..."
              className="w-full h-24 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              {...register("about")}
            />
            <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition">
              Save
            </button>
          </form>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">💡 Update Why Choose Us</h2>
          <form className="space-y-3" onSubmit={handleSubmit(HandleChoose)}>
            <textarea
              placeholder="Enter Why Choose Us text..."
              className="w-full h-24 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
              {...register("choose")}
            />
            <input
              type="submit"
              className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
            />
          </form>
        </div>

        {/* Reviews */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">✍️ Update Reviews</h2>
          <form
            className="space-y-3"
            onSubmit={reviewform.handleSubmit(HandelReview)}
          >
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              {...reviewform.register("Name", { required: "Name is required" })}
            />
            <textarea
              placeholder="Review"
              className="w-full h-24 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
              {...reviewform.register("Review", { required: "Review is required" })}
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              {...reviewform.register("Role", { required: "Role is required" })}
            />
            <button className="w-full bg-purple-600 text-white rounded-lg py-2 hover:bg-purple-700 transition">
              Save
            </button>
          </form>
        </div>

        {/* Portfolio Images Upload */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">🖼️ Upload Portfolio Image</h2>
          <form className="space-y-3" onSubmit={imageform.handleSubmit(ImgSubmit)}>
            <input
              {...imageform.register("file")}
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
            <input
              type="submit"
              className="w-full bg-pink-600 text-white rounded-lg py-2 hover:bg-pink-700 transition"
            />
          </form>
        </div>

        {/* Reviews List */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📝 Existing Reviews</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {reviews.length ? (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="border p-3 rounded hover:shadow transition"
                >
                  <p className="font-semibold">{r.Name}</p>
                  <p className="text-sm text-gray-500">{r.Role}</p>
                  <p className="mt-1">{r.Review}</p>
                  <button
                    className="text-red-600 mt-2"
                    onClick={() => HandleDeleteReview(r.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Images List */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">🖼️ Portfolio Images</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {images.length ? (
            images.map((img) => (
              <div
                key={img.id}
                className="flex items-center justify-between border p-2 rounded"
              >
                <img
                  src={`http://localhost:3000${img.url}`}
                  alt="portfolio"
                  className="h-16 rounded"
                />
                <button
                  className="text-red-600"
                  onClick={() => HandleDeleteImage(img.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

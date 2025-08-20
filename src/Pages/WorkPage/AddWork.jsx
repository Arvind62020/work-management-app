import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddWork() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check for valid token on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await axios.post(
                "http://localhost:3000/api/v1/jobs",
                { title, description },
                {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 201) {
                setSuccess(true);
                setTitle("");
                setDescription("");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setError(err.response?.data?.message || err.message || "Failed to post job");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            navigate("/admin");
        }
    }, [success, navigate]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Job Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Content Writer Needed"
                    />
                </div>
                <div>
                    <label className="block mb-1">Job Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Detailed job description..."
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                    disabled={loading}
                >
                    {loading ? "Posting Job..." : "Post Job"}
                </button>
            </form>
        </div>
    );
}

export default AddWork;
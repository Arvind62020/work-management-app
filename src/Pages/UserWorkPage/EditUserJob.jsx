import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RefreshJsx } from './UserWorkPage';
import axios from 'axios';

function EditUserJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accepted: 'false',
    status: 'open'
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:3000/api/v1/jobs/${jobId}`,
          { headers: { 'x-access-token': token } }
        );
        
        const jobData = response.data.data;
        setJobDetails(jobData); // Store full job details
        setFormData({
          accepted: jobData.accepted?.toString() || 'false',
          status: jobData.status || 'open'
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        setError('Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      // Only send accepted and status fields
      await axios.put(
        `http://localhost:3000/api/v1/jobs/user/${jobId}`,
        {
          accepted: formData.accepted === 'true',
          status: formData.status
        },
        { 
          headers: { 
            'x-access-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );
      RefreshJsx();
      navigate('/user/work'); // Redirect to user jobs page after update
    } catch (error) {
      console.error('Error updating job:', error);
      setError(error.response?.data?.message || 'Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-lg">Loading job details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-lg text-red-500">{error}</div>;
  }

  if (!jobDetails) {
    return <div className="flex justify-center items-center h-64 text-lg">Job not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Update Job Status</h2>
      
      {/* Display job details (read-only) */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{jobDetails.title}</h3>
        <p className="text-gray-600 mb-2">{jobDetails.description}</p>
        <p className="text-sm text-gray-500">Assigned to: {jobDetails.assignTo}</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Accepted</label>
          <select
            name="accepted"
            value={formData.accepted}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              formData.accepted === 'true' 
                ? 'bg-green-100 border-green-300 text-green-800' 
                : 'bg-blue-100 border-blue-300 text-blue-800'
            }`}
          >
            <option value="true">Accepted</option>
            <option value="false">Not Accepted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)} // Go back to previous page
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserJob;


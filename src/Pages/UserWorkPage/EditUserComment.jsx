import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditUserComment() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  // Existing state
  const [formData, setFormData] = useState({ accepted: 'false', status: 'open' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState(null);
  
  // New state for comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    title: '',
    description: ''
  });
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  // Fetch job details AND comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch job details
        const jobResponse = await axios.get(
          `http://localhost:3000/api/v1/jobs/${jobId}`,
          { headers: { 'x-access-token': token } }
        );
        setJobDetails(jobResponse.data.data);
        setFormData({
          accepted: jobResponse.data.data.accepted?.toString() || 'false',
          status: jobResponse.data.data.status || 'open'
        });

        // Fetch comments
        const commentsResponse = await axios.get(
          `http://localhost:3000/api/v1/jobupdate/${jobId}`,
          { headers: { 'x-access-token': token } }
        );
        setComments(commentsResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  // Handle comment input change
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsCommentSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/jobupdate',
        {
          ...newComment,
          jobId: jobId // Add jobId from params
        },
        { 
          headers: { 
            'x-access-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );

      // Add new comment to list and reset form
      setComments(prev => [response.data.data, ...prev]);
      setNewComment({ title: '', description: '' });
    } catch (error) {
      console.error('Error posting comment:', error);
      setError(error.response?.data?.message || 'Failed to post update');
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  // ... keep all your existing code (handleChange, handleSubmit, etc.) ...

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Existing job update form */}
      <h2 className="text-2xl font-bold mb-6">Update Job Status</h2>
      {/* ... your existing job form ... */}

      {/* Comment Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Job Updates</h3>
        
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Add Update</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newComment.title}
              onChange={handleCommentChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={newComment.description}
              onChange={handleCommentChange}
              className="w-full border rounded-md p-2 h-24"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            disabled={isCommentSubmitting}
          >
            {isCommentSubmitting ? 'Posting...' : 'Post Update'}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No updates yet</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{comment.title}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{comment.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted by: {comment.userId}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUserComment;
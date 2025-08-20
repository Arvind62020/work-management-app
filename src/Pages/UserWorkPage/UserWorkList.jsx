import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserWorkList({ jobs = [], isLoading, onNavigateBack, refreshJobs }) {
  const navigate = useNavigate();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-lg">Loading jobs...</div>;
  }

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const handleEditJob = (jobId) => {
    navigate(`/user/list/edit/${jobId}`);
  };

  const handleDeleteJob = async (jobId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/v1/jobs/${jobId}`, {
        headers: { 'x-access-token': token }
      });
      refreshJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  const handleEditCommentJob = (jobId, e) => {
    e.stopPropagation();
    navigate(`/user/list/editcomment/${jobId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onNavigateBack}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors"
        >
          Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Your Assigned Jobs</h2>

      {safeJobs.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No jobs assigned to you</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeJobs.map(job => {
            if (!job || !job._id) return null;
            
            return (
              <div 
                key={job._id} 
                className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                onClick={() => handleEditJob(job._id)}
              >
                {/* Action Buttons Container - Fixed */}
                <div className="absolute top-2 right-2 flex space-x-2 bg-white/90 p-1 rounded-md">
                  <button
                    onClick={(e) => handleEditCommentJob(job._id, e)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Edit comments"
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M21 15C21 16.6569 19.6569 18 18 18H7.91421L4.41421 21.5858C4.04918 21.9508 3.5292 22.0808 3.0506 21.9298C2.57199 21.7788 2.20364 21.3616 2.08081 20.8496C1.95797 20.3376 2.09633 19.805 2.4506 19.4506L5.91421 16H6C4.34315 16 3 14.6569 3 13V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V15Z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDeleteJob(job._id, e)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    title="Delete job"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 pr-6">{job.title || 'No title'}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{job.description || 'No description'}</p>
                
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">Assigned To:</span>
                  <p className="text-sm text-gray-600">{job.assignTo || 'Not assigned'}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    job.accepted === true || job.accepted === 'true' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.accepted === true || job.accepted === 'true' ? 'Accepted' : 'Not Accepted'}
                  </span>
                  
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' : 
                    job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status || 'No status'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserWorkList;
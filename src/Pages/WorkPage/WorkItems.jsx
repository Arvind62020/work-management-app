import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WorkItems({
  jobs,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onNavigateBack,
  refreshJobs
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-lg">Loading jobs...</div>;
  }

  const handleEditJob = (jobId) => {
    navigate(`/admin/list/edit/${jobId}`);
  };

  const handleDeleteJob = async (jobId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/v1/jobs/${jobId}`, {
        headers: { 'x-access-token': token }
      });
      refreshJobs();
      onPageChange(currentPage);
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
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

      <h2 className="text-2xl font-bold mb-6 text-center">Job Listings</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No jobs available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div 
              key={job._id} 
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
              onClick={() => handleEditJob(job._id)}
            >
              {/* Delete button with hover effect */}
              <button
                onClick={(e) => handleDeleteJob(job._id, e)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete job"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              <h3 className="text-xl font-semibold mb-2 pr-6">{job.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
              
              {/* Added Accepted Status */}
              <div className="mb-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  job.accepted === true || job.accepted === 'true' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {job.accepted === true || job.accepted === 'true' ? 'Accepted' : 'Not Accepted'}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  job.status === 'open' ? 'bg-green-100 text-green-800' : 
                  job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
                <span className="text-sm text-gray-500">
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Posted by: {job.userId?.username} ({job.userId?.email})
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination remains unchanged */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            &lt;
          </button>

          {/* Page Numbers - Show limited pages around current page */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === pageNum
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkItems;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkItems from "./WorkItems";

function WorkList() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = 6; // Set the desired number of items per page

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/jobs?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`,
          {
            headers: { "x-access-token": token }
          }
        );
        setJobs(response.data.data.jobs);
        setTotalPages(Math.ceil(response.data.data.pagination.totalItems / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, navigate, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const refreshJobs = async () => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios.get(
          `http://localhost:3000/api/v1/jobs?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`,
          {
            headers: { "x-access-token": token }
          }
        );
      setJobs(response.data.data.jobs);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <WorkItems 
      jobs={jobs}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onNavigateBack={() => navigate(-1)}
      refreshJobs={refreshJobs}
    />
  );
}

export default WorkList;
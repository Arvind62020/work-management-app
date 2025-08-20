import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserWorkList from "./UserWorkList";

function UserWorkPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
  setIsLoading(true);
  try {
    console.log("Fetching jobs for email:", userEmail); // Debug log
    const response = await axios.get(
      `http://localhost:3000/api/v1/jobs/assign/${userEmail}`,
      { headers: { "x-access-token": token } }
    );
    
    console.log("API Response:", response.data); // Debug log
    
    const jobsData = response.data?.data?.jobs || [];
    
    console.log("Jobs data:", jobsData); // Debug log
    
    const filteredJobs = jobsData.map(job => ({
      _id: job._id,
      title: job.title,
      description: job.description,
      assignTo: job.assignTo,
      accepted: job.accepted,
      status: job.status
    }));
    
    setJobs(filteredJobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    setJobs([]);
  } finally {
    setIsLoading(false);
  }
};

    fetchJobs();
  }, [navigate]);

  const refreshJobs = async () => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/jobs/assign/${userEmail}`,
        { headers: { "x-access-token": token } }
      );
      
      const filteredJobs = response.data.data.jobs.map(job => ({
        _id: job._id,
        title: job.title,
        description: job.description,
        assignTo: job.assignTo,
        accepted: job.accepted,
        status: job.status
      }));
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };


  
  return (
    <UserWorkList 
      jobs={jobs}
      isLoading={isLoading}
      onNavigateBack={() => navigate(-1)}
      refreshJobs={refreshJobs}
    />
  );
}

export default UserWorkPage;

export  function RefreshJsx(){
  const refreshJobs = async () => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/jobs/assign/${userEmail}`,
        { headers: { "x-access-token": token } }
      );
      
      const filteredJobs = response.data.data.jobs.map(job => ({
        _id: job._id,
        title: job.title,
        description: job.description,
        assignTo: job.assignTo,
        accepted: job.accepted,
        status: job.status
      }));
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return refreshJobs;

}
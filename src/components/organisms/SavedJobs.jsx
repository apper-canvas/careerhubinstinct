import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JobCard from "@/components/molecules/JobCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { savedJobService } from "@/services/api/savedJobService";
import { jobService } from "@/services/api/jobService";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      setError("");
      
      const savedJobsData = await savedJobService.getAll();
      setSavedJobs(savedJobsData);

      // Load job details for each saved job
      const jobPromises = savedJobsData.map(saved => jobService.getById(saved.jobId));
      const jobsData = await Promise.all(jobPromises);
      
      const jobsMap = {};
      jobsData.forEach(job => {
        jobsMap[job.Id] = job;
      });
      setJobs(jobsMap);
    } catch (err) {
      setError(err.message || "Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const handleSaveToggle = (jobId, isSaved) => {
    if (!isSaved) {
      // Remove from local state immediately
      setSavedJobs(prev => prev.filter(saved => saved.jobId !== jobId));
    }
  };

  if (loading) return <Loading className="py-8" />;
  if (error) return <Error message={error} onRetry={loadSavedJobs} />;
  if (savedJobs.length === 0) {
    return (
      <Empty
        title="No Saved Jobs"
        description="You haven't saved any jobs yet. Start exploring opportunities and save jobs that interest you for later."
        icon="Heart"
        actionLabel="Browse Jobs"
        onAction={() => window.location.href = "/jobs"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 font-display">
          Saved Jobs ({savedJobs.length})
        </h2>
      </div>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {savedJobs.map((savedJob, index) => (
          <motion.div
            key={savedJob.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <JobCard
              job={jobs[savedJob.jobId]}
              saved={true}
              onSaveToggle={handleSaveToggle}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SavedJobs;
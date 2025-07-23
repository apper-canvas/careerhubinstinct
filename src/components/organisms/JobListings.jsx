import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JobCard from "@/components/molecules/JobCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { jobService } from "@/services/api/jobService";
import { savedJobService } from "@/services/api/savedJobService";

const JobListings = ({ filters = {}, showSaveButton = true }) => {
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const [jobsData, savedJobsData] = await Promise.all([
        jobService.getAll(filters),
        savedJobService.getAll()
      ]);
      
      setJobs(jobsData);
      setSavedJobIds(new Set(savedJobsData.map(saved => saved.jobId)));
    } catch (err) {
      setError(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [filters]);

  const handleSaveToggle = (jobId, isSaved) => {
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      if (isSaved) {
        newSet.add(jobId);
      } else {
        newSet.delete(jobId);
      }
      return newSet;
    });
  };

  if (loading) return <Loading variant="jobs" />;
  if (error) return <Error message={error} onRetry={loadJobs} />;
  if (jobs.length === 0) {
    return (
      <Empty
        title="No Jobs Found"
        description="We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms."
        icon="Briefcase"
        actionLabel="Clear Filters"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 font-display">
          {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Found
        </h2>
      </div>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {jobs.map((job, index) => (
          <motion.div
            key={job.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <JobCard
              job={job}
              showSaveButton={showSaveButton}
              saved={savedJobIds.has(job.Id)}
              onSaveToggle={handleSaveToggle}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default JobListings;
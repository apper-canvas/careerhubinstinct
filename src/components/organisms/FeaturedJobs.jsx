import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JobCard from "@/components/molecules/JobCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { jobService } from "@/services/api/jobService";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFeaturedJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await jobService.getFeatured();
      setJobs(data);
    } catch (err) {
      setError(err.message || "Failed to load featured jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedJobs();
  }, []);

  if (loading) return <Loading className="py-12" />;
  if (error) return <Error message={error} onRetry={loadFeaturedJobs} />;
  if (jobs.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4 font-display">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked job opportunities from top companies
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {jobs.map((job, index) => (
            <motion.div
              key={job.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
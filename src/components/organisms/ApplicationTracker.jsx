import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApplicationCard from "@/components/molecules/ApplicationCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { applicationService } from "@/services/api/applicationService";
import { jobService } from "@/services/api/jobService";

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");
      
      const applicationsData = await applicationService.getAll();
      setApplications(applicationsData);

      // Load job details for each application
      const jobPromises = applicationsData.map(app => jobService.getById(app.jobId));
      const jobsData = await Promise.all(jobPromises);
      
      const jobsMap = {};
      jobsData.forEach(job => {
        jobsMap[job.Id] = job;
      });
      setJobs(jobsMap);
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) return <Loading className="py-8" />;
  if (error) return <Error message={error} onRetry={loadApplications} />;
  if (applications.length === 0) {
    return (
      <Empty
        title="No Applications Yet"
        description="You haven't applied to any jobs yet. Start exploring opportunities and apply to jobs that match your skills."
        icon="Send"
        actionLabel="Browse Jobs"
        onAction={() => window.location.href = "/jobs"}
      />
    );
  }

  const getStatusCount = (status) => {
    return applications.filter(app => app.status.toLowerCase() === status.toLowerCase()).length;
  };

  const statusStats = [
    { label: "Applied", count: getStatusCount("Applied"), color: "text-blue-600 bg-blue-100" },
    { label: "Under Review", count: getStatusCount("Under Review"), color: "text-yellow-600 bg-yellow-100" },
    { label: "Interview Scheduled", count: getStatusCount("Interview Scheduled"), color: "text-purple-600 bg-purple-100" },
    { label: "Hired", count: getStatusCount("Hired"), color: "text-green-600 bg-green-100" }
  ];

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card p-6 text-center"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} mb-3`}>
              <span className="text-2xl font-bold">{stat.count}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Applications List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 font-display">
          Your Applications ({applications.length})
        </h3>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {applications.map((application, index) => (
            <motion.div
              key={application.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ApplicationCard
                application={application}
                job={jobs[application.jobId]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
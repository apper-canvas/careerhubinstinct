import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { jobService } from "@/services/api/jobService";
import { applicationService } from "@/services/api/applicationService";
import { savedJobService } from "@/services/api/savedJobService";
import { format } from "date-fns";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const loadJobData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [jobData, savedStatus] = await Promise.all([
        jobService.getById(id),
        savedJobService.isJobSaved(id)
      ]);
      
      setJob(jobData);
      setIsSaved(savedStatus);
    } catch (err) {
      setError(err.message || "Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobData();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      
      await applicationService.create({
        jobId: parseInt(id),
        notes: "Applied through CareerHub platform",
        resume: "john_doe_resume_2024.pdf",
        coverLetter: `I am very interested in the ${job.title} position at ${job.company}.`
      });
      
      toast.success("Application submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setApplying(false);
    }
  };

  const handleSaveToggle = async () => {
    try {
      setSaving(true);
      
      if (isSaved) {
        await savedJobService.deleteByJobId(parseInt(id));
        setIsSaved(false);
        toast.success("Job removed from saved jobs");
      } else {
        await savedJobService.create({
          jobId: parseInt(id),
          notes: ""
        });
        setIsSaved(true);
        toast.success("Job saved successfully");
      }
    } catch (error) {
      toast.error("Failed to update saved job");
    } finally {
      setSaving(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified";
    return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
  };

  if (loading) return <Loading variant="job-detail" />;
  if (error) return <Error message={error} onRetry={loadJobData} />;
  if (!job) return <Error message="Job not found" />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Back to Jobs
          </Button>
        </motion.div>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl mb-8 border border-primary-100"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900 font-display">
                  {job.title}
                </h1>
                {job.featured && (
                  <Badge variant="accent" className="flex items-center gap-1">
                    <ApperIcon name="Star" className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {job.company}
              </h2>
              
              <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <ApperIcon name="MapPin" className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Clock" className="w-5 h-5" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="DollarSign" className="w-5 h-5" />
                  <span>{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  <span>Posted {format(new Date(job.postedDate), "MMM dd, yyyy")}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">{job.experienceLevel}</Badge>
                <Badge variant="secondary">{job.industry}</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:min-w-[200px]">
              <Button
                variant="primary"
                size="lg"
                onClick={handleApply}
                disabled={applying}
                className="w-full"
              >
                {applying ? (
                  <>
                    <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="w-5 h-5 mr-2" />
                    Apply Now
                  </>
                )}
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={handleSaveToggle}
                disabled={saving}
                className="w-full"
              >
                {saving ? (
                  <>
                    <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ApperIcon name={isSaved ? "Heart" : "Heart"} className={`w-5 h-5 mr-2 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved" : "Save Job"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Job Description */}
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-display flex items-center gap-2">
                <ApperIcon name="FileText" className="w-6 h-6 text-primary-600" />
                Job Description
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-display flex items-center gap-2">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-primary-600" />
                Requirements
              </h3>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ApperIcon name="Check" className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-display flex items-center gap-2">
                <ApperIcon name="Gift" className="w-6 h-6 text-primary-600" />
                Benefits & Perks
              </h3>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ApperIcon name="Star" className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Company Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">
                About {job.company}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Building" className="w-4 h-4" />
                  <span>Technology Company</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Users" className="w-4 h-4" />
                  <span>1,000+ employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Globe" className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </Card>

            {/* Job Quick Facts */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">
                Quick Facts
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience Level</span>
                  <Badge variant="default" size="sm">{job.experienceLevel}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <Badge variant="primary" size="sm">{job.industry}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <Badge variant="secondary" size="sm">{job.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">
                    {format(new Date(job.postedDate), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </Card>

            {/* Apply Section */}
            <Card className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 font-display">
                Ready to Apply?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Submit your application and take the next step in your career journey.
              </p>
              <Button
                variant="primary"
                onClick={handleApply}
                disabled={applying}
                className="w-full"
              >
                {applying ? "Applying..." : "Apply Now"}
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
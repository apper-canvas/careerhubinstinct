import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import ApplicationTracker from "@/components/organisms/ApplicationTracker";
import SavedJobs from "@/components/organisms/SavedJobs";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { applicationService } from "@/services/api/applicationService";
import { savedJobService } from "@/services/api/savedJobService";
import { jobService } from "@/services/api/jobService";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    totalJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [applications, savedJobs, allJobs] = await Promise.all([
        applicationService.getAll(),
        savedJobService.getAll(),
        jobService.getAll()
      ]);

      const interviews = applications.filter(app => 
        app.status.toLowerCase().includes("interview")
      ).length;

      setStats({
        applications: applications.length,
        savedJobs: savedJobs.length,
        interviews,
        totalJobs: allJobs.length
      });
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: "Layout" },
    { id: "applications", label: "Applications", icon: "Send" },
    { id: "saved", label: "Saved Jobs", icon: "Heart" }
  ];

  const quickActions = [
    {
      title: "Browse Jobs",
      description: "Discover new opportunities",
      icon: "Search",
      action: () => navigate("/jobs"),
      color: "bg-primary-500"
    },
    {
      title: "Update Profile",
      description: "Keep your information current",
      icon: "User",
      action: () => navigate("/profile"),
      color: "bg-secondary-500"
    },
    {
      title: "Upload Resume",
      description: "Add or update your resume",
      icon: "Upload",
      action: () => navigate("/documents"),
      color: "bg-accent-500"
    }
  ];

  if (loading) return <Loading className="py-8" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
            Career Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your job search progress and manage your applications
          </p>
        </motion.div>

        {/* Stats Overview */}
        {activeTab === "overview" && (
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <ApperIcon name="Send" className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.applications}
              </div>
              <div className="text-sm text-gray-600">Applications</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                <ApperIcon name="Heart" className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.savedJobs}
              </div>
              <div className="text-sm text-gray-600">Saved Jobs</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
                <ApperIcon name="Calendar" className="w-6 h-6 text-secondary-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.interviews}
              </div>
              <div className="text-sm text-gray-600">Interviews</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-4">
                <ApperIcon name="Briefcase" className="w-6 h-6 text-accent-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.totalJobs}
              </div>
              <div className="text-sm text-gray-600">Available Jobs</div>
            </Card>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div 
          className="flex space-x-1 bg-white p-1 rounded-lg mb-8 shadow-sm border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 font-display">
                  Quick Actions
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer group"
                      onClick={action.action}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${action.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                        <ApperIcon name={action.icon} className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 font-display">
                    Recent Activity
                  </h2>
                  <Link 
                    to="/jobs" 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All Jobs
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="Send" className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Applied to Senior Frontend Developer</p>
                      <p className="text-sm text-gray-600">at TechCorp Solutions • 2 days ago</p>
                    </div>
                    <Badge variant="info">Applied</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="Heart" className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Saved Data Scientist position</p>
                      <p className="text-sm text-gray-600">at Analytics First • 3 days ago</p>
                    </div>
                    <Badge variant="default">Saved</Badge>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <Button variant="secondary" onClick={() => setActiveTab("applications")}>
                    View All Applications
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "applications" && <ApplicationTracker />}
          {activeTab === "saved" && <SavedJobs />}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import FeaturedJobs from "@/components/organisms/FeaturedJobs";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
  };

  const features = [
    {
      icon: "Search",
      title: "Smart Job Search",
      description: "Find the perfect job with our advanced filtering and search capabilities"
    },
    {
      icon: "Heart",
      title: "Save & Track",
      description: "Save interesting jobs and track your application progress in one place"
    },
    {
      icon: "FileText",
      title: "Resume Management",
      description: "Upload and manage your resumes with easy application submission"
    },
    {
      icon: "BarChart3",
      title: "Career Insights",
      description: "Get insights into market trends and optimize your job search strategy"
    }
  ];

  const stats = [
    { label: "Active Job Listings", value: "50,000+", icon: "Briefcase" },
    { label: "Companies Hiring", value: "5,000+", icon: "Building" },
    { label: "Successful Placements", value: "25,000+", icon: "Users" },
    { label: "Countries Covered", value: "50+", icon: "Globe" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 font-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your{" "}
              <span className="gradient-text">Dream Career</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Connect with top employers and discover opportunities that match your skills, 
              interests, and career goals. Your next big opportunity is just a search away.
            </motion.p>

            <motion.div 
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search for jobs, companies, or keywords..."
                className="shadow-xl"
              />
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate("/jobs")}
                className="text-lg px-8 py-4"
              >
                <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                Explore Jobs
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="text-lg px-8 py-4"
              >
                <ApperIcon name="Layout" className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mb-4">
                  <ApperIcon name={stat.icon} className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4 font-display">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need 
              for a successful job search journey.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-8 text-center group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      <FeaturedJobs />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-display">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of professionals who have found their dream jobs through CareerHub.
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => navigate("/jobs")}
                className="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4"
              >
                <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                Start Job Search
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4"
              >
                <ApperIcon name="User" className="w-5 h-5 mr-2" />
                Create Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
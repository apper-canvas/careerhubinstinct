import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import FileUpload from "@/components/molecules/FileUpload";
import ApperIcon from "@/components/ApperIcon";
import { userService } from "@/services/api/userService";
import { format } from "date-fns";

const DocumentsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      const result = await userService.uploadResume(file);
      
      setProfile(prev => ({
        ...prev,
        resumeUrl: result.url
      }));
      
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await userService.deleteResume();
      setProfile(prev => ({
        ...prev,
        resumeUrl: null
      }));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const getFileInfo = (url) => {
    if (!url) return null;
    
    const fileName = url.split("/").pop();
    const extension = fileName.split(".").pop().toUpperCase();
    
    return {
      name: fileName,
      type: extension,
      size: "2.1 MB", // Mock size
      uploadDate: new Date()
    };
  };

  if (loading) return <Loading className="py-8" />;
  if (error) return <Error message={error} onRetry={loadProfile} />;

  const fileInfo = getFileInfo(profile.resumeUrl);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
            Document Management
          </h1>
          <p className="text-lg text-gray-600">
            Upload and manage your resumes and other documents
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Current Resume */}
          {fileInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 font-display flex items-center gap-2">
                  <ApperIcon name="FileText" className="w-6 h-6 text-primary-600" />
                  Current Resume
                </h2>
                
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                      <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{fileInfo.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Size: {fileInfo.size}</span>
                        <span>•</span>
                        <span>Uploaded: {format(fileInfo.uploadDate, "MMM dd, yyyy")}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="flex items-center gap-1">
                      <ApperIcon name="Check" className="w-3 h-3" />
                      Active
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(profile.resumeUrl, "_blank")}
                    >
                      <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteResume}
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 font-display flex items-center gap-2">
                <ApperIcon name="Upload" className="w-6 h-6 text-primary-600" />
                {fileInfo ? "Upload New Resume" : "Upload Resume"}
              </h2>
              
              {uploading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3">
                    <ApperIcon name="Loader2" className="w-8 h-8 animate-spin text-primary-600" />
                    <span className="text-lg font-medium text-gray-900">
                      Uploading your resume...
                    </span>
                  </div>
                </div>
              ) : (
                <FileUpload
                  onFileSelect={handleFileUpload}
                  acceptedTypes=".pdf,.doc,.docx"
                  maxSize={10 * 1024 * 1024} // 10MB
                />
              )}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <ApperIcon name="Info" className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">Tips for a great resume:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Keep it concise and relevant to the jobs you're applying for</li>
                      <li>Use a clean, professional format</li>
                      <li>Include quantifiable achievements and results</li>
                      <li>Proofread carefully for spelling and grammar errors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Resume Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 font-display flex items-center gap-2">
                <ApperIcon name="Lightbulb" className="w-6 h-6 text-primary-600" />
                Resume Best Practices
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mt-1">
                      <ApperIcon name="Check" className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Clear Structure</h3>
                      <p className="text-sm text-gray-600">
                        Organize sections logically with clear headings and consistent formatting
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mt-1">
                      <ApperIcon name="Target" className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Targeted Content</h3>
                      <p className="text-sm text-gray-600">
                        Customize your resume for each job application to highlight relevant skills
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mt-1">
                      <ApperIcon name="BarChart3" className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Quantify Results</h3>
                      <p className="text-sm text-gray-600">
                        Use numbers and metrics to demonstrate your impact and achievements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mt-1">
                      <ApperIcon name="Zap" className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Action Words</h3>
                      <p className="text-sm text-gray-600">
                        Start bullet points with strong action verbs to make your experience stand out
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
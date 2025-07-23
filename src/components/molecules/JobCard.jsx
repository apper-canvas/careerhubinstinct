import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { savedJobService } from "@/services/api/savedJobService";
import { format } from "date-fns";

const JobCard = ({ job, showSaveButton = true, saved = false, onSaveToggle }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(saved);
  const [loading, setLoading] = useState(false);

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    setLoading(true);
    
    try {
      if (isSaved) {
        await savedJobService.deleteByJobId(job.Id);
        setIsSaved(false);
        toast.success("Job removed from saved jobs");
      } else {
        await savedJobService.create({
          jobId: job.Id,
          notes: ""
        });
        setIsSaved(true);
        toast.success("Job saved successfully");
      }
      onSaveToggle && onSaveToggle(job.Id, !isSaved);
    } catch (error) {
      toast.error("Failed to update saved job");
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified";
    return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
  };

  return (
    <Card hover onClick={() => navigate(`/jobs/${job.Id}`)} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 font-display">
              {job.title}
            </h3>
            {job.featured && (
              <Badge variant="accent" size="sm">
                <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <p className="text-lg text-gray-700 font-medium mb-1">{job.company}</p>
          <div className="flex items-center text-gray-600 text-sm gap-4">
            <div className="flex items-center gap-1">
              <ApperIcon name="MapPin" className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" className="w-4 h-4" />
              {job.type}
            </div>
          </div>
        </div>
        {showSaveButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveToggle}
            disabled={loading}
            className="ml-4 p-2"
          >
            <ApperIcon 
              name={isSaved ? "Heart" : "Heart"} 
              className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`} 
            />
          </Button>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="primary">{job.experienceLevel}</Badge>
          <Badge variant="default">{job.industry}</Badge>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">{formatSalary(job.salary)}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(job.postedDate), "MMM dd, yyyy")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const ApplicationCard = ({ application, job }) => {
  const navigate = useNavigate();

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "info";
      case "under review":
        return "warning";
      case "interview scheduled":
        return "primary";
      case "rejected":
        return "error";
      case "hired":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "Send";
      case "under review":
        return "Eye";
      case "interview scheduled":
        return "Calendar";
      case "rejected":
        return "X";
      case "hired":
        return "Check";
      default:
        return "Clock";
    }
  };

  return (
    <Card hover onClick={() => navigate(`/jobs/${job.Id}`)} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 font-display mb-2">
            {job.title}
          </h3>
          <p className="text-lg text-gray-700 font-medium mb-1">{job.company}</p>
          <div className="flex items-center text-gray-600 text-sm gap-4">
            <div className="flex items-center gap-1">
              <ApperIcon name="MapPin" className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              Applied {format(new Date(application.appliedDate), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
        <Badge variant={getStatusVariant(application.status)} className="flex items-center gap-1">
          <ApperIcon name={getStatusIcon(application.status)} className="w-3 h-3" />
          {application.status}
        </Badge>
      </div>

      {application.notes && (
        <p className="text-gray-600 mb-4 italic">
          "{application.notes}"
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ApperIcon name="FileText" className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{application.resume}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/jobs/${job.Id}`);
          }}
        >
          View Job
          <ApperIcon name="ExternalLink" className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default ApplicationCard;
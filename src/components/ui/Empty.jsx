import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.",
  actionLabel,
  onAction,
  icon = "Search",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full mb-6">
        <ApperIcon name={icon} className="w-16 h-16 text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;
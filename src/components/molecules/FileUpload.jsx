import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FileUpload = ({ onFileSelect, acceptedTypes = ".pdf,.doc,.docx", maxSize = 5 * 1024 * 1024, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = acceptedTypes.split(",").map(type => type.trim().toLowerCase());
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      toast.error(`Please select a valid file type: ${acceptedTypes}`);
      return false;
    }
    
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (files) => {
    const file = files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
        isDragOver ? "border-primary-400 bg-primary-50" : "border-gray-300 hover:border-gray-400",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <ApperIcon name="Upload" className="w-8 h-8 text-gray-600" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop your resume here, or{" "}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary-600 hover:text-primary-700 underline"
            >
              browse
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: {acceptedTypes} (max {Math.round(maxSize / (1024 * 1024))}MB)
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
          Choose File
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
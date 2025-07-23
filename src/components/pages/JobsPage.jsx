import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobFilters from "@/components/organisms/JobFilters";
import JobListings from "@/components/organisms/JobListings";

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Initialize filters from URL parameters
    const initialFilters = {
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      industry: searchParams.get("industry") || "",
      type: searchParams.get("type") || "",
      experienceLevel: searchParams.get("experienceLevel") || "",
      salaryMin: searchParams.get("salaryMin") || "",
      salaryMax: searchParams.get("salaryMax") || ""
    };
    setFilters(initialFilters);
  }, [searchParams]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
            Job Opportunities
          </h1>
          <p className="text-lg text-gray-600">
            Discover your next career opportunity from thousands of job listings
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <JobListings filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
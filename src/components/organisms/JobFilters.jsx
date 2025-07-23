import { useState, useEffect } from "react";
import FilterSection from "@/components/molecules/FilterSection";

const JobFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    type: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    search: "",
    ...initialFilters
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: "",
      industry: "",
      type: "",
      experienceLevel: "",
      salaryMin: "",
      salaryMax: "",
      search: filters.search // Keep search term
    };
    setFilters(clearedFilters);
  };

  return (
    <FilterSection
      filters={filters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
    />
  );
};

export default JobFilters;
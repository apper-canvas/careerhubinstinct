import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSection = ({ filters, onFilterChange, onClearFilters }) => {
  const industries = ["Technology", "Marketing", "Design", "Sales", "Finance", "Healthcare"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
  const experienceLevels = ["Entry-level", "Mid-level", "Senior", "Executive"];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "" && value !== undefined);

  return (
    <div className="bg-white p-6 rounded-xl shadow-card border border-gray-100 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 font-display">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary-600 hover:text-primary-700"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter city or state"
            value={filters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select
            id="industry"
            value={filters.industry || ""}
            onChange={(e) => handleFilterChange("industry", e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="type">Job Type</Label>
          <Select
            id="type"
            value={filters.type || ""}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            id="experienceLevel"
            value={filters.experienceLevel || ""}
            onChange={(e) => handleFilterChange("experienceLevel", e.target.value)}
          >
            <option value="">All Levels</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Salary Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min salary"
              type="number"
              value={filters.salaryMin || ""}
              onChange={(e) => handleFilterChange("salaryMin", e.target.value)}
            />
            <Input
              placeholder="Max salary"
              type="number"
              value={filters.salaryMax || ""}
              onChange={(e) => handleFilterChange("salaryMax", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
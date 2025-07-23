import jobsData from "@/services/mockData/jobs.json";

const jobs = [...jobsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const jobService = {
  async getAll(filters = {}) {
    await delay(300);
    
    let filteredJobs = [...jobs];
    
    // Apply filters
    if (filters.location && filters.location !== "") {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.industry && filters.industry !== "") {
      filteredJobs = filteredJobs.filter(job => 
        job.industry.toLowerCase() === filters.industry.toLowerCase()
      );
    }
    
    if (filters.type && filters.type !== "") {
      filteredJobs = filteredJobs.filter(job => 
        job.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.experienceLevel && filters.experienceLevel !== "") {
      filteredJobs = filteredJobs.filter(job => 
        job.experienceLevel.toLowerCase() === filters.experienceLevel.toLowerCase()
      );
    }
    
    if (filters.salaryMin) {
      filteredJobs = filteredJobs.filter(job => 
        job.salary.max >= parseInt(filters.salaryMin)
      );
    }
    
    if (filters.salaryMax) {
      filteredJobs = filteredJobs.filter(job => 
        job.salary.min <= parseInt(filters.salaryMax)
      );
    }
    
    if (filters.search && filters.search !== "") {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredJobs;
  },

  async getById(id) {
    await delay(200);
    const job = jobs.find(j => j.Id === parseInt(id));
    if (!job) {
      throw new Error("Job not found");
    }
    return { ...job };
  },

  async getFeatured() {
    await delay(250);
    return jobs.filter(job => job.featured).slice(0, 3);
  },

  async create(jobData) {
    await delay(300);
    const newId = Math.max(...jobs.map(j => j.Id)) + 1;
    const newJob = {
      Id: newId,
      ...jobData,
      postedDate: new Date().toISOString()
    };
    jobs.push(newJob);
    return { ...newJob };
  },

  async update(id, updateData) {
    await delay(300);
    const index = jobs.findIndex(j => j.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Job not found");
    }
    jobs[index] = { ...jobs[index], ...updateData };
    return { ...jobs[index] };
  },

  async delete(id) {
    await delay(200);
    const index = jobs.findIndex(j => j.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Job not found");
    }
    jobs.splice(index, 1);
    return true;
  }
};
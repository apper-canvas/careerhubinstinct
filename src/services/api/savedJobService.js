import savedJobsData from "@/services/mockData/savedJobs.json";

const savedJobs = [...savedJobsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const savedJobService = {
  async getAll() {
    await delay(250);
    return [...savedJobs];
  },

  async getById(id) {
    await delay(200);
    const savedJob = savedJobs.find(s => s.Id === parseInt(id));
    if (!savedJob) {
      throw new Error("Saved job not found");
    }
    return { ...savedJob };
  },

  async create(savedJobData) {
    await delay(300);
    const newId = Math.max(...savedJobs.map(s => s.Id)) + 1;
    const newSavedJob = {
      Id: newId,
      ...savedJobData,
      savedDate: new Date().toISOString()
    };
    savedJobs.push(newSavedJob);
    return { ...newSavedJob };
  },

  async update(id, updateData) {
    await delay(300);
    const index = savedJobs.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Saved job not found");
    }
    savedJobs[index] = { ...savedJobs[index], ...updateData };
    return { ...savedJobs[index] };
  },

  async delete(id) {
    await delay(200);
    const index = savedJobs.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Saved job not found");
    }
    savedJobs.splice(index, 1);
    return true;
  },

  async deleteByJobId(jobId) {
    await delay(200);
    const index = savedJobs.findIndex(s => s.jobId === parseInt(jobId));
    if (index === -1) {
      return false;
    }
    savedJobs.splice(index, 1);
    return true;
  },

  async isJobSaved(jobId) {
    await delay(100);
    return savedJobs.some(s => s.jobId === parseInt(jobId));
  }
};
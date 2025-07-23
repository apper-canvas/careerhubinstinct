import applicationsData from "@/services/mockData/applications.json";

const applications = [...applicationsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const applicationService = {
  async getAll() {
    await delay(300);
    return [...applications];
  },

  async getById(id) {
    await delay(200);
    const application = applications.find(a => a.Id === parseInt(id));
    if (!application) {
      throw new Error("Application not found");
    }
    return { ...application };
  },

  async getByJobId(jobId) {
    await delay(200);
    return applications.filter(a => a.jobId === parseInt(jobId));
  },

  async create(applicationData) {
    await delay(400);
    const newId = Math.max(...applications.map(a => a.Id)) + 1;
    const newApplication = {
      Id: newId,
      ...applicationData,
      status: "Applied",
      appliedDate: new Date().toISOString()
    };
    applications.push(newApplication);
    return { ...newApplication };
  },

  async update(id, updateData) {
    await delay(300);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications[index] = { ...applications[index], ...updateData };
    return { ...applications[index] };
  },

  async delete(id) {
    await delay(200);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications.splice(index, 1);
    return true;
  }
};
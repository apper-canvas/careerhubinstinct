export const jobService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "clientId_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "jobType_c" } },
          { field: { Name: "salaryMin_c" } },
          { field: { Name: "salaryMax_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "requiredSkills_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "applicants_c" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('job_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching jobs:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "clientId_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "jobType_c" } },
          { field: { Name: "salaryMin_c" } },
          { field: { Name: "salaryMax_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "requiredSkills_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "applicants_c" } }
        ]
      };

      const response = await apperClient.getRecordById('job_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching job with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(jobData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Name: jobData.Name || jobData.title_c || `Job ${Date.now()}`,
            title_c: jobData.title_c,
            company_c: jobData.company_c,
            clientId_c: jobData.clientId_c ? parseInt(jobData.clientId_c) : null,
            location_c: jobData.location_c,
            jobType_c: jobData.jobType_c,
            salaryMin_c: jobData.salaryMin_c ? parseInt(jobData.salaryMin_c) : null,
            salaryMax_c: jobData.salaryMax_c ? parseInt(jobData.salaryMax_c) : null,
            experienceLevel_c: jobData.experienceLevel_c,
            requiredSkills_c: jobData.requiredSkills_c,
            description_c: jobData.description_c,
            status_c: jobData.status_c || 'active',
            createdAt_c: new Date().toISOString(),
            applicants_c: 0
          }
        ]
      };

      const response = await apperClient.createRecord('job_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create job ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating job:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Id: parseInt(id),
            ...(updateData.Name && { Name: updateData.Name }),
            ...(updateData.title_c && { title_c: updateData.title_c }),
            ...(updateData.company_c && { company_c: updateData.company_c }),
            ...(updateData.clientId_c && { clientId_c: parseInt(updateData.clientId_c) }),
            ...(updateData.location_c && { location_c: updateData.location_c }),
            ...(updateData.jobType_c && { jobType_c: updateData.jobType_c }),
            ...(updateData.salaryMin_c && { salaryMin_c: parseInt(updateData.salaryMin_c) }),
            ...(updateData.salaryMax_c && { salaryMax_c: parseInt(updateData.salaryMax_c) }),
            ...(updateData.experienceLevel_c && { experienceLevel_c: updateData.experienceLevel_c }),
            ...(updateData.requiredSkills_c && { requiredSkills_c: updateData.requiredSkills_c }),
            ...(updateData.description_c && { description_c: updateData.description_c }),
            ...(updateData.status_c && { status_c: updateData.status_c }),
            ...(updateData.applicants_c !== undefined && { applicants_c: parseInt(updateData.applicants_c) })
          }
        ]
      };

      const response = await apperClient.updateRecord('job_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update job ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating job:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('job_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting job:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};
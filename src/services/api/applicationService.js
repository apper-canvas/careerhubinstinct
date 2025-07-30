export const applicationService = {
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
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } }
        ],
        orderBy: [
          {
            fieldName: "appliedAt_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications:", error?.response?.data?.message);
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
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } }
        ]
      };

      const response = await apperClient.getRecordById('application_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching application with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByJobId(jobId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } }
        ],
        where: [
          {
            FieldName: "jobId_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications by job ID:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByCandidateId(candidateId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } }
        ],
        where: [
          {
            FieldName: "candidateId_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications by candidate ID:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(applicationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Validate required fields
      if (!applicationData.jobId_c || !applicationData.candidateId_c) {
        throw new Error('Job ID and Candidate ID are required');
      }

      // Check if application already exists
      const existingApps = await this.getByJobId(applicationData.jobId_c);
      const existingApp = existingApps.find(app => app.candidateId_c === applicationData.candidateId_c);
      
      if (existingApp) {
        throw new Error('Candidate has already been applied to this job');
      }

      const params = {
        records: [
          {
            Name: applicationData.Name || `Application ${Date.now()}`,
            jobId_c: parseInt(applicationData.jobId_c),
            candidateId_c: parseInt(applicationData.candidateId_c),
            appliedAt_c: new Date().toISOString(),
            status_c: applicationData.status_c || 'applied',
            notes_c: applicationData.notes_c || '',
            interview_c: applicationData.interview_c || ''
          }
        ]
      };

      const response = await apperClient.createRecord('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create application ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating application:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async updateStatus(applicationId, newStatus) {
    try {
      const validStatuses = ['applied', 'screening', 'interview_scheduled', 'final_review', 'hired', 'rejected'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}. Valid statuses are: ${validStatuses.join(', ')}`);
      }

      return await this.update(applicationId, { status_c: newStatus });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, applicationData) {
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
            ...applicationData
          }
        ]
      };

      const response = await apperClient.updateRecord('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update application ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting application:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async checkApplication(jobId, candidateId) {
    try {
      const applications = await this.getByJobId(jobId);
      return applications.find(app => app.candidateId_c === candidateId) || null;
    } catch (error) {
      console.error("Error checking application:", error.message);
      return null;
    }
  },

  async scheduleInterview(applicationId, interviewData) {
    try {
      const { date, time, interviewer, type, notes } = interviewData;
      if (!date || !time || !interviewer || !type) {
        throw new Error('Date, time, interviewer, and type are required');
      }

      const validTypes = ['Phone', 'Video', 'In-person'];
      if (!validTypes.includes(type)) {
        throw new Error('Invalid interview type');
      }

      const interviewString = JSON.stringify({
        date,
        time, 
        interviewer,
        type,
        notes: notes || ''
      });

      return await this.update(applicationId, {
        status_c: 'interview_scheduled',
        interview_c: interviewString
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error scheduling interview:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async updateInterview(applicationId, interviewData) {
    try {
      const application = await this.getById(applicationId);
      if (!application || !application.interview_c) {
        throw new Error('No interview scheduled for this application');
      }

      let existingInterview = {};
      try {
        existingInterview = JSON.parse(application.interview_c);
      } catch (e) {
        existingInterview = {};
      }

      const updatedInterview = {
        ...existingInterview,
        ...interviewData
      };

      return await this.update(applicationId, {
        interview_c: JSON.stringify(updatedInterview)
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating interview:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getUpcomingInterviews() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "interview_c" } }
        ],
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: ["interview_scheduled"]
          }
        ]
      };

      const response = await apperClient.fetchRecords('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      const now = new Date();
      const upcomingInterviews = (response.data || [])
        .filter(app => app.interview_c)
        .map(app => {
          try {
            const interview = JSON.parse(app.interview_c);
            const interviewDateTime = new Date(`${interview.date}T${interview.time}`);
            return {
              ...app,
              interview,
              interviewDateTime
            };
          } catch (e) {
            return null;
          }
        })
        .filter(app => app && app.interviewDateTime >= now)
        .sort((a, b) => a.interviewDateTime - b.interviewDateTime);

      return upcomingInterviews.map(app => {
        const { interviewDateTime, ...rest } = app;
        return rest;
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming interviews:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
};
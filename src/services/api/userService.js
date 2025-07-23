import userProfileData from "@/services/mockData/userProfile.json";

let userProfile = { ...userProfileData };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getProfile() {
    await delay(200);
    return { ...userProfile };
  },

  async updateProfile(updateData) {
    await delay(300);
    userProfile = { ...userProfile, ...updateData };
    return { ...userProfile };
  },

  async uploadResume(file) {
    await delay(500);
    // Simulate file upload
    const fileName = `${userProfile.name.replace(/\s+/g, '_').toLowerCase()}_resume_${Date.now()}.pdf`;
    userProfile.resumeUrl = `/documents/${fileName}`;
    return {
      fileName,
      url: userProfile.resumeUrl,
      size: file.size,
      type: file.type
    };
  },

  async deleteResume() {
    await delay(200);
    userProfile.resumeUrl = null;
    return true;
  }
};
import axios from "axios";

const CLASS_URL = "https://learnzilla.herokuapp.com/classroom";
const STUDENT_URL = "https://learnzilla.herokuapp.com/student";

const TeacherApi = {
  // Login and Register
  register: async (payload) => {
    return await axios.post(`${STUDENT_URL}/register`, payload);
  },
  login: async (payload) => {
    return await axios.post(`${STUDENT_URL}/login`, payload);
  },
  getStudentDetails: async (payload) => {
    return await axios.post(`${STUDENT_URL}/`, payload);
  },

  // HomePage
  getClasses: async (payload) => {
    return await axios.post(`${CLASS_URL}/`, payload[0]);
  },
 

  // Inside Class
  getAssignments: async (classId) => {
    return await axios.get(`${CLASS_URL}/viewassignments/${classId}/`);
  },
 

  getMarks: async (studentid) => {
    return await axios.get(`${CLASS_URL}/viewmarks/studentid/${studentid}/`);
  },

getStudents: async (classId, payload) => {
    return await axios.post(
      `${CLASS_URL}/viewstudents/${classId}/`,
      payload[0]
    );
  },
 

  getAttendance: async (classId,studentid) => {
    return await axios.get(`${CLASS_URL}/viewattendance/${classId}/${studentid}`);
  },


  // Student Profile
  changePassword: async (payload, studentName) => {
    return await axios.post(
      `${STUDENT_URL}/${studentName}/change-password`,
      payload
    );
  },
};

export default studentAPI;

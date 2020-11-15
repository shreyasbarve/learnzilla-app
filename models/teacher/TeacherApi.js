import axios from "axios";

const CLASS_URL = "https://learnzilla.herokuapp.com/classroom";
const TEACHER_URL = "https://learnzilla.herokuapp.com/teacher";

const TeacherApi = {
  // Login and Register
  register: async (payload) => {
    return await axios.post(`${TEACHER_URL}/register`, payload);
  },
  login: async (payload) => {
    return await axios.post(`${TEACHER_URL}/login`, payload);
  },
  getTeacherDetails: async (payload) => {
    return await axios.post(`${TEACHER_URL}/`, payload);
  },

  // HomePage
  getClasses: async (payload) => {
    return await axios.post(`${CLASS_URL}/`, payload[0]);
  },
  createClass: async (payload) => {
    return await axios.post(`${CLASS_URL}/create/`, payload);
  },

  // Inside Class
  getAssignments: async (classId) => {
    return await axios.get(`${CLASS_URL}/viewassignments/${classId}/`);
  },
  createAssignment: async (payload) => {
    return await axios.get(`${CLASS_URL}/create-new-assign/`, payload);
  },

  getMarks: async (classId) => {
    return await axios.get(`${CLASS_URL}/viewmarks/classroomid/${classId}/`);
  },
  addMarks: async (payload) => {
    return await axios.post(`${CLASS_URL}/addmarks/`, payload);
  },

  getStudents: async (classId, payload) => {
    return await axios.post(
      `${CLASS_URL}/viewstudents/${classId}/`,
      payload[0]
    );
  },
  addStudent: async (payload) => {
    return await axios.post(`${CLASS_URL}/addstudent/`, payload);
  },

  getAttendance: async (classId) => {
    return await axios.get(`${CLASS_URL}/viewattendance/${classId}`);
  },
  addAttendance: async (payload) => {
    return await axios.post(`${CLASS_URL}/markattendance/`, payload);
  },

  // Teacher Profile
  changePassword: async (payload, teacherName) => {
    return await axios.post(
      `${TEACHER_URL}/${teacherName}/change-password`,
      payload
    );
  },
};

export default TeacherApi;

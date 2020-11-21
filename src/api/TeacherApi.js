import axios from "axios";

const CLASS_URL = "https://learnzilla.herokuapp.com/classroom";
const TEACHER_URL = "https://learnzilla.herokuapp.com/teacher";

const TeacherApi = {
  // Login and Register and logout
  signup: async (payload) => {
    return await axios.post(`${TEACHER_URL}/register/`, payload);
  },
  login: async (payload) => {
    return await axios.post(`${TEACHER_URL}/login/`, payload);
  },
  details: async (payload) => {
    return await axios.post(`${TEACHER_URL}/`, payload);
  },
  logout: async (payload) => {
    return await axios.post(`${TEACHER_URL}/logout/`, payload);
  },

  // HomePage
  getClasses: async (payload) => {
    return await axios.post(`${CLASS_URL}/`, payload);
  },
  createClass: async (payload) => {
    return await axios.post(`${CLASS_URL}/create/`, payload);
  },

  // Inside Class
  // Assignments
  getAssignments: async (classId) => {
    return await axios.get(`${CLASS_URL}/viewassignments/${classId}/`);
  },
  createAssignment: async (payload) => {
    return await axios.post(`${CLASS_URL}/create-new-assign/`, payload);
  },

  // Marks
  getMarks: async (classId) => {
    return await axios.get(`${CLASS_URL}/viewmarks/classroomid/${classId}/`);
  },
  addMarks: async (payload) => {
    return await axios.post(`${CLASS_URL}/addmarks/`, payload);
  },

  // Students
  getStudents: async (payload, classId) => {
    return await axios.post(`${CLASS_URL}/viewstudents/${classId}/`, payload);
  },
  addStudent: async (payload) => {
    return await axios.post(`${CLASS_URL}/addstudent/`, payload);
  },

  // Attendance
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

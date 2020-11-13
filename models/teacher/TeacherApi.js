import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const TeacherApi = {
  allClasses: async () => {
    return await axios.get(BASE_URL);
  },
  class: async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
  },
};

export default TeacherApi;

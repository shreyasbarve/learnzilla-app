import axios from "axios";

const URL = "https://learnzilla.herokuapp.com/institution";

const InstitutionApi = {
  //   login
  login: async () => {
    return await axios.post(`${URL}/login/`, {
      email: "patna@gmail.com",
      password: "password",
    });
  },
};

export default InstitutionApi;

import axios from "axios";

const CORS = 'https://cors-anywhere.herokuapp.com/';

const instance = axios.create({
  baseURL: `${CORS}http://77.120.241.80:8811/api`,
});

export const API = {
  getUsers: () => {
    return instance.get("/users");
  },
  addUser: (name, surname, desc = null, avatar = null) => {
    return instance.post("/users", {
      name,
      surname,
      desc,
      avatar
    });
  },
  deleteUser: (id) => {
    return instance.delete(`/user/${id}`);
  },
  editUser: (id, name, surname, desc = null, avatar = null) => {
    return instance.put(`/user/${id}`, {
      name,
      surname,
      desc,
      avatar
    });
  },
};
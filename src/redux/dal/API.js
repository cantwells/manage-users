import axios from "axios";

const instance = axios.create({
  baseURL: "http://77.120.241.80:8811/api",
});

export const API = {
  getUsers: () => {
    return instance.get("/users");
  },
};

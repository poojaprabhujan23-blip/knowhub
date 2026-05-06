import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/resources",
});

export const getResources = () => API.get("/");

export const addResource = (data) =>
  API.post("/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteResource = (id) => API.delete(`/${id}`);
export const updateResource = (id, data) =>API.put(`/${id}`, data);
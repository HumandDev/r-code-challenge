import axios from "axios";

export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 15000,
});

export const localApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 15000,
});

import axios from "axios";

const client = axios.create({
	baseURL: "http://localhost:3001/api/v1/",
});

export const clientPrivate = axios.create({
	baseURL: "http://localhost:8800/api/v1/",
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export default client;

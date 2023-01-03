import axios from "axios";

const client = axios.create({
	baseURL: "https://localhost:3000/api/v1/",
	// baseURL: "https://budget-app-production-8a62.up.railway.app/api/v1/",
});

export const clientPrivate = axios.create({
	// baseURL: "https://budget-app-production-8a62.up.railway.app/api/v1/",
	baseURL: "https://localhost:3000/api/v1/",
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export default client;

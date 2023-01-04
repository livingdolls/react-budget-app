import axios from "axios";

const client = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

export const clientPrivate = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,

	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export default client;

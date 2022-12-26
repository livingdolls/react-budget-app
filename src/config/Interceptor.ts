import { clientPrivate } from "./axios";

const priv = clientPrivate;

priv.interceptors.response.use(
	(response) => response,
	async (error) => {
		const prevRequest = error?.config;
		if (error?.response?.status === 401 && !prevRequest?.sent) {
			prevRequest.sent = true;
			const newAccessToken = await clientPrivate("/auth/token");
			const token = newAccessToken.data.accessToken;
			prevRequest.headers["Authorization"] = `Bearer ${token}`;
			return clientPrivate(prevRequest);
		}
		return Promise.reject(error);
	}
);

export default priv;

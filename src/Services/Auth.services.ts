import client from "../config/axios";
import { TUser } from "../Types/Auth.type";

export const LoginService = async (data: Omit<TUser, "nama">) => {
	const respon = await client
		.post("/auth/login", data, { withCredentials: true })
		.then((res) => res.data);

	return respon;
};

import priv from "../config/Interceptor";

export const ViewExpensePlan = async (data: string, token: any) => {
	console.log(data);
	const respon = await priv.get(`/expense-plan/${data}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return respon;
};

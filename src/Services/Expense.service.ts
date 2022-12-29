import priv from "../config/Interceptor";

const BASE_URL = "/expense/";

type PostExpense = {
	data: { title: string; budget: number; idExpensePlan: string };
	token: any;
};

export const PostExpense = (data: PostExpense) => {
	const parse = { ...data.data, budget: Number(data.data.budget) };
	const respon = priv
		.post(BASE_URL, parse, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
		.then((res) => res.data);

	return respon;
};

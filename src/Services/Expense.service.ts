import priv from "../config/Interceptor";
import { TExpense } from "../Types/Budget.types";

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

type EditExpense = {
	data: TExpense;
	token: any;
};

export const PatchExpenseService = async (data: EditExpense) => {
	const parse = {
		idExpensePlan: data.data.idExpensePlan,
		title: data.data.title,
		budget: Number(data.data.budget),
	};
	const respon = await priv
		.put(`${BASE_URL}/${data.data.id_expense}`, parse, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
		.then((res) => res.data);

	return respon;
};

type HapusExpense = {
	id_expense: string;
	token: any;
};

export const DeleteExpenseService = async (data: HapusExpense) => {
	const respon = await priv
		.delete(`${BASE_URL}/${data.id_expense}`, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
		.then((res) => res.data);

	return respon;
};

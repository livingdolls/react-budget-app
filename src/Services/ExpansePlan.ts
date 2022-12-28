import priv from "../config/Interceptor";
import { TAddExpense } from "../pages/Dashboard/AddExpensePlan";

export const ViewExpensePlan = async (data: string, token: any) => {
	const respon = await priv
		.get(`/expense-plan/${data}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);
	return respon;
};

export const CreateExpensePlan = async (data: TAddExpense) => {
	const newData = {
		idMainBudget: data.idBudget,
		title: data.expense.title,
		maxExpense: Number(data.expense.budget),
	};

	const respon = await priv
		.post("/expense-plan", newData)
		.then((res) => res.data);

	return respon;
};

type Delete = {
	id: string;
	token: any;
};

export const DeleteExpensePlan = async ({ id, token }: Delete) => {
	const respon = await priv
		.delete(`/expense-plan/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);

	return respon;
};

import priv from "../config/Interceptor";
import { TAddExpense } from "../pages/Dashboard/ExpensePlan/AddExpensePlan";
import { Expense } from "../Types/Budget.types";

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

type PostEPlan = {
	data: TAddExpense;
	token: any;
};

export const CreateExpensePlan = async (data: PostEPlan) => {
	const newData = {
		idMainBudget: data.data.idBudget,
		title: data.data.expense.title,
		maxExpense: Number(data.data.expense.budget),
	};

	const respon = await priv
		.post("/expense-plan", newData, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
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

type EditExpense = {
	data: Pick<
		Expense,
		"idMainBudget" | "title" | "maxExpense" | "id_expensePlan"
	>;
	token: any;
};

export const EditExpensePlanService = async (data: EditExpense) => {
	const parseBody = {
		idMainBudget: data.data.idMainBudget,
		title: data.data.title,
		maxExpense: Number(data.data.maxExpense),
	};
	const respon = await priv
		.put(`/expense-plan/${data.data.id_expensePlan}`, parseBody, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
		.then((res) => res.data);

	return respon;
};

export const FindExpensePlan = async (id: string, token: any) => {
	const respon = await priv
		.get(`/expense-plan/plan/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);
	return respon;
};

import priv from "../config/Interceptor";
import { TAddExpense } from "../pages/Dashboard/AddExpensePlan";

export const ViewExpensePlan = async (data: string, token: any) => {
	console.log(data);
	const respon = await priv.get(`/expense-plan/${data}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return respon;
};

export const CreateExpensePlan = async (data: TAddExpense) => {
	console.log(data);
	// const respon = await priv.post('/expense-plan')
};

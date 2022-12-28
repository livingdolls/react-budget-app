import priv from "../config/Interceptor";
import { TIncome } from "../Types/Budget.types";

type PIncome = {
	idBudget: string;
	title: string;
	budget: number;
	token: any;
};

const BASE_URL = "/income/budget";

export const PostIncomeService = async (data: PIncome) => {
	const respon = await priv
		.post(
			`${BASE_URL}/${data.idBudget}`,
			{ title: data.title, budget: Number(data.budget) },
			{
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			}
		)
		.then((res) => res.data);

	return respon;
};

export const GetIncomeService = async (
	data: Pick<PIncome, "idBudget" | "token">
) => {
	const respon = await priv
		.get(`${BASE_URL}/${data.idBudget}`, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
		.then((res) => res.data);

	return respon;
};

type PatchIncome = {
	data: TIncome;
	token: any;
};

export const PatchIncomeService = async (data: PatchIncome) => {
	const newData = {
		title: data.data.title,
		budget: Number(data.data.budget),
	};

	const respon = await priv
		.put(
			`${BASE_URL}/${data.data.idMainBudget}/${data.data.id_income}`,
			newData,
			{
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			}
		)
		.then((res) => res.data);

	return respon;
};

type DelIncome = {
	data: Pick<TIncome, "idMainBudget" | "id_income">;
	token: any;
};

export const DeleteIncomeService = async (data: DelIncome) => {
	const respon = await priv
		.delete(
			`${BASE_URL}/${data.data.idMainBudget}/${data.data.id_income}`,
			{
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			}
		)
		.then((res) => res.data);

	return respon;
};

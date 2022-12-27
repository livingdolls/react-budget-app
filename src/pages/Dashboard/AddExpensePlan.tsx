import { useState } from "react";
import { useMutation } from "react-query";
import Rupiah from "../../utils/Rupiah";
import SumExpense from "../../utils/SumExpense";
import { Expense } from "./ExpensePlan";
import { CreateExpensePlan } from "../../Services/ExpansePlan";

type propsExpensePlan = {
	handleModalExpense: () => void;
	exp: Expense[];
	idBudget: string;
};

type expense = {
	title: string;
	budget: number;
};

export type TAddExpense = {
	expense: expense;
	idBudget: string;
};

const AddExpensePlan = ({ exp, idBudget }: propsExpensePlan) => {
	const maxExpense = SumExpense(exp);
	const [expense, setExpense] = useState<expense>({
		title: "",
		budget: 0,
	});

	const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setExpense({ ...expense, [name]: value });
	};

	const mutate = useMutation(CreateExpensePlan, {
		onMutate: () => {
			console.log("hhh");
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate.mutate({ expense, idBudget });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-6">
				<label
					htmlFor={"income"}
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Rencana Pengeluaran
				</label>
				<input
					type="text"
					id="title"
					name="title"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Rencana Pengeluaran"
					required
					onChange={handleForm}
				/>
			</div>

			<div className="mb-6">
				<label
					htmlFor={"budget"}
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Budget Max{" "}
					<p className="text-bold inline text-red-500">{`${Rupiah(
						Number(maxExpense)
					)}`}</p>
				</label>
				<input
					type="number"
					id="budget"
					name="budget"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="0"
					required
					onChange={handleForm}
				/>
			</div>

			<div className="">
				<button
					type="submit"
					className="text-white text-bold mt-4 bg-accent-green-500 hover:bg-accent-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-1.5 mr-2 mb-2 "
				>
					Tambah Budget
				</button>
			</div>
		</form>
	);
};

export default AddExpensePlan;

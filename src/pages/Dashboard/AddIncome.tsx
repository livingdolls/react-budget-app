import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { SpinnerSmallWhite } from "../../components/Spinner";
import { NotifyAlert } from "../../components/Toast";
import { PostIncomeService } from "../../Services/Income.service";
import AuthUser from "../../store/Auth.store";
import { TBudget } from "../../Types/Budget.types";

type PIncome = {
	budget: TBudget;
	action: () => void;
};

const AddIncome = ({ budget, action }: PIncome) => {
	const queryClient = useQueryClient();
	const [user] = useRecoilState(AuthUser);
	const [income, setIncome] = useState({
		title: "",
		budget: 0,
	});
	const mutate = useMutation(PostIncomeService, {
		onSettled: () => {
			queryClient.invalidateQueries("budget");
		},
		onSuccess: async () => {
			NotifyAlert("success", "Berhasil menambah income!");
			action();
		},
		onError: async (err: any) => {
			const zod = err.response.data;
			if (err.response.status === 400) {
				zod.map((e: any) => {
					NotifyAlert("error", e.message);
				});
			}

			NotifyAlert("error", err.response.data.message);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			idBudget: budget.id_main_budget,
			title: income.title,
			budget: income.budget,
			token: user,
		};
		mutate.mutate(data);
	};

	const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setIncome({ ...income, [name]: value });
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-6">
				<label
					htmlFor={"income"}
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Income
				</label>
				<input
					type="text"
					id="title"
					name="title"
					className="bg-gray-50  ring-1 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-accent-green-500 focus:outline-none focus:border-transparent border border-gray-300  0 focus:border-accent-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
					placeholder="Income"
					required
					onChange={handleForm}
				/>
			</div>

			<div className="mb-6">
				<label
					htmlFor={"budget"}
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Budget
				</label>
				<input
					type="number"
					id="budget"
					name="budget"
					className="bg-gray-50  ring-1 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-accent-green-500 focus:outline-none focus:border-transparent border border-gray-300  0 focus:border-accent-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
					placeholder="0"
					required
					onChange={handleForm}
				/>
			</div>

			<div className="">
				<button
					type="submit"
					disabled={mutate.isLoading}
					className="text-white text-bold mt-4 bg-accent-green-500 hover:bg-accent-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-1.5 mr-2 mb-2 "
				>
					{mutate.isLoading ? <SpinnerSmallWhite /> : "Tambah"}
				</button>
			</div>
		</form>
	);
};

export default AddIncome;

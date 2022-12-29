import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { SpinnerSmallWhite } from "../../../components/Spinner";
import { NotifyAlert } from "../../../components/Toast";
import { PostExpense } from "../../../Services/Expense.service";
import AuthUser from "../../../store/Auth.store";
import Rupiah from "../../../utils/Rupiah";

type ExpenseProps = {
	id: string;
	modal: () => void;
	usage: number;
};

const AddExpense = ({ id, modal, usage }: ExpenseProps) => {
	const queryClient = useQueryClient();
	const [user] = useRecoilState(AuthUser);
	const [expense, setExpense] = useState({
		title: "",
		budget: 0,
	});

	const mutate = useMutation(PostExpense, {
		onSettled: () => {
			queryClient.invalidateQueries("budget");
		},
		onError: async (err: any) => {
			const zod = err.response.data;
			if (err.response.status === 400) {
				zod.map((e: any) => {
					NotifyAlert("error", e.message);
				});
			}

			if (err.response.status === 401) {
				NotifyAlert("error", "Akses dilarang");
			}

			NotifyAlert("error", err.response.data.message);
		},
		onSuccess: async () => {
			NotifyAlert("success", "Berhasil menambah pengeluaran!");
			modal();
		},
	});

	const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setExpense({ ...expense, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {
			data: { ...expense, idExpensePlan: id },
			token: user,
		};

		mutate.mutate(data);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-6">
				<label
					htmlFor={"income"}
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Pengeluaran
				</label>
				<input
					type="text"
					id="title"
					name="title"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Pengeluaran"
					required
					onChange={handleForm}
				/>
			</div>

			<div className="mb-6">
				<label
					htmlFor={"budget"}
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Budget (Sisa{" "}
					<p className="text-red-500 inline"> {Rupiah(usage)} </p>)
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
					disabled={mutate.isLoading}
					className="text-white text-bold mt-4 bg-accent-green-500 hover:bg-accent-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-1.5 mr-2 mb-2 "
				>
					{mutate.isLoading ? <SpinnerSmallWhite /> : "Tambah"}
				</button>
			</div>
		</form>
	);
};

export default AddExpense;

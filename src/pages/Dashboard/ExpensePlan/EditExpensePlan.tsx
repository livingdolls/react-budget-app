import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { SpinnerSmallWhite } from "../../../components/Spinner";
import { NotifyAlert } from "../../../components/Toast";
import { EditExpensePlanService } from "../../../Services/ExpansePlan";
import AuthUser from "../../../store/Auth.store";
import BudgetStore from "../../../store/Budget.store";
import { Expense } from "../../../Types/Budget.types";
import Rupiah from "../../../utils/Rupiah";

type EditExProps = {
	expense: Expense;
	setEditExpense: React.Dispatch<React.SetStateAction<Expense>>;
	setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditExpensePlan = ({
	expense,
	setEditExpense,
	setModalEdit,
}: EditExProps) => {
	const [user] = useRecoilState(AuthUser);
	const [budget] = useRecoilState(BudgetStore);
	const queryClient = useQueryClient();
	const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditExpense({ ...expense, [name]: value });
	};

	const mutate = useMutation(EditExpensePlanService, {
		onSettled: () => {
			queryClient.invalidateQueries("budget");
		},
		onError: (err: any) => {
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
		onSuccess: () => {
			NotifyAlert("success", "Berhasil mengubah rencana pengeluaran!");
			setModalEdit(false);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			idMainBudget: expense.idMainBudget,
			title: expense.title,
			maxExpense: expense.maxExpense,
			id_expensePlan: expense.id_expensePlan,
		};
		const newData = {
			data: data,
			token: user,
		};

		mutate.mutate(newData);
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
					value={expense.title}
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
						Number(budget.budget - budget.usage)
					)}`}</p>
				</label>
				<input
					type="number"
					id="maxExpense"
					name="maxExpense"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="0"
					required
					value={expense.maxExpense}
					onChange={handleForm}
				/>
			</div>

			<div className="">
				<button
					type="submit"
					disabled={mutate.isLoading}
					className="text-white text-bold mt-4 bg-accent-green-500 hover:bg-accent-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-1.5 mr-2 mb-2 "
				>
					{mutate.isLoading ? <SpinnerSmallWhite /> : "Edit"}
				</button>
			</div>
		</form>
	);
};

export default EditExpensePlan;

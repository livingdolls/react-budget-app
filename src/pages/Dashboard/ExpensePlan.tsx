import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import CardExpense from "../../components/CardExpense";
import { Dialog } from "../../components/Dialog";
import { NotifyAlert } from "../../components/Toast";
import { DeleteExpensePlan } from "../../Services/ExpansePlan";
import AuthUser from "../../store/Auth.store";
import { Expense } from "../../Types/Budget.types";

type TExpense = {
	expense: Expense[];
};

const ExpensePlan = ({ expense }: TExpense) => {
	const [user] = useRecoilState(AuthUser);
	const queryClient = useQueryClient();
	const [dialog, setDialog] = useState(false);
	const [info, setInfo] = useState({ id: "", nama: "" });

	const hanldeDelete = (id: string, nama: string) => {
		setInfo({ id: id, nama: nama });
		setDialog(true);
	};

	const mutate = useMutation(DeleteExpensePlan, {
		onError: (err) => {
			console.log(err);
		},
		onSuccess: () => {
			NotifyAlert("success", "Berhasil menghapus rencana pengeluaran!");
			setDialog(false);
		},
		onSettled: () => {
			queryClient.invalidateQueries("budget");
		},
	});

	const confirmDelete = () => {
		const d = { id: info.id, token: user };

		mutate.mutate(d);
	};

	return (
		<div className="p-5 flex flex-col md:flex-row gap-4 flex-wrap 2xl:justify-around xl:justify-around lg:justify-center justify-start md:items-baseline ">
			{expense?.map((e) => {
				let percent = (e.usage / e.maxExpense) * 100;
				return (
					<CardExpense
						num={percent}
						data={e}
						del={hanldeDelete}
						key={e.id_expensePlan}
					/>
				);
			})}
			{dialog ? (
				<Dialog>
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
									<svg
										className="h-6 w-6 text-red-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
										/>
									</svg>
								</div>
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3
										className="text-lg font-medium leading-6 text-gray-900"
										id="modal-title"
									>
										Hapus Rencana Pengeluaran {info.nama} ?
									</h3>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Apa anda yakin ? semua data akan
											dihapus secara permanent. Aksi init
											tidak bisa dibatalkan.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								disabled={mutate.isLoading}
								onClick={() => confirmDelete()}
								className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Hapus
							</button>
							<button
								onClick={() => setDialog(false)}
								type="button"
								className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Batal
							</button>
						</div>
					</div>
				</Dialog>
			) : null}
		</div>
	);
};

export default ExpensePlan;

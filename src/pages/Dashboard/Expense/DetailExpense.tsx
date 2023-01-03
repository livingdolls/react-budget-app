import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FindExpensePlan } from "../../../Services/ExpansePlan.service";
import AuthUser from "../../../store/Auth.store";
import { TExpense } from "../../../Types/Budget.types";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ClimbingBoxLoader } from "react-spinners";
import Rupiah from "../../../utils/Rupiah";
import { DeleteSvg, EditSvg, WarningSvg } from "../../../components/svg";
import { Spinner, SpinnerSmallWhite } from "../../../components/Spinner";
import { useState } from "react";
import MainModal from "../../../components/MainModal";
import EditExpense from "./EditExpense";
import { Dialog } from "../../../components/Dialog";
import { DeleteExpenseService } from "../../../Services/Expense.service";
import { NotifyAlert } from "../../../components/Toast";
import id from "dayjs/locale/id";

const DetailExpense = () => {
	const { idExpensePlan } = useParams();
	const queryClient = useQueryClient();
	dayjs.locale(id);
	const [user] = useRecoilState(AuthUser);
	const [modalEdit, setModalEdit] = useState<boolean>(false);
	const [modalHapus, setModaHapus] = useState<boolean>(false);
	dayjs.extend(customParseFormat);
	const [select, setSelect] = useState<TExpense>({
		title: "",
		budget: 0,
		idExpensePlan: "",
		id_expense: "",
	});

	if (idExpensePlan === undefined) {
		return <p>Maaf, pengeluaran tidak ditemukan</p>;
	}

	const expensePlan = useQuery(
		"expense",
		() => FindExpensePlan(idExpensePlan, user),
		{
			refetchOnWindowFocus: false,
			refetchInterval: 150000,
		}
	);

	const handleEdit = (data: TExpense) => {
		setSelect(data);
		setModalEdit(true);
	};

	const handleHapus = (data: TExpense) => {
		setModaHapus(!modalHapus);
		setSelect(data);
	};

	const hapusMutate = useMutation(DeleteExpenseService, {
		onSettled: () => {
			queryClient.invalidateQueries("budget");
			queryClient.invalidateQueries("expense");
		},
		onError: (err) => {
			NotifyAlert("error", "Ada kesalahan, silahkan ulangi!");
		},
		onSuccess: () => {
			NotifyAlert("success", "Berhasil menghapus pengeluaran!");
			setModaHapus(false);
		},
	});

	const confirmHapus = () => {
		const parse = {
			id_expense: select.id_expense,
			token: user,
		};
		hapusMutate.mutate(parse);
	};

	if (expensePlan.isLoading) {
		return (
			<div className="h-screen flex justify-center flex-col items-center content-center">
				<ClimbingBoxLoader color="#36d7b7" size={50} />
			</div>
		);
	}

	return (
		<div className="w-full h-full p-2 bg-white shadow-lg">
			{expensePlan.isFetching ? <Spinner /> : ""}
			<p className="text-md font-semibold text-gray-600  mt-2">
				Pengeluaran untuk{" "}
				<p className="text-accent-green-900 inline">
					{expensePlan?.data?.data?.title}
				</p>
			</p>

			<p className="text-md font-semibold text-gray-600  mt-2">
				Pengeluaran digunakan {Rupiah(expensePlan?.data?.data?.usage)} /{" "}
				{Rupiah(expensePlan?.data?.data?.maxExpense)}
			</p>
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="border-b bg-accent-green-500">
								<tr>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										No
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Nama
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Total
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Tanggal
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Aksi
									</th>
								</tr>
							</thead>
							<tbody>
								{expensePlan.data.data.Expense.map(
									(e: TExpense, i: number) => {
										let date = dayjs(e.create_at).format(
											"dddd DD-MM-YYYY"
										);
										return (
											<tr
												className="border-b"
												key={e.id_expense}
											>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{i + 1}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{e.title}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<p className="p-1 bg-material-10 inline rounded-full text-white px-2 font-semibold">
														{Rupiah(e.budget)}
													</p>
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{date}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<button
														disabled={
															expensePlan.isFetching
														}
														onClick={() =>
															handleEdit(e)
														}
														className="p-1 bg-accent-green-500 hover:bg-accent-green-900 text-white rounded-full"
													>
														<EditSvg />
													</button>

													<button
														disabled={
															expensePlan.isFetching
														}
														onClick={() =>
															handleHapus(e)
														}
														className="p-1 bg-material-20 hover:bg-material-10 rounded-full text-white ml-1"
													>
														<DeleteSvg />
													</button>
												</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{modalEdit ? (
				<MainModal
					judul={"Edit Pengeluaran"}
					action={() => setModalEdit(false)}
				>
					<EditExpense
						data={select}
						setSelect={setSelect}
						action={() => setModalEdit(false)}
						budgetUsage={
							expensePlan.data.data.maxExpense -
							expensePlan.data.data.usage
						}
					/>
				</MainModal>
			) : null}

			{modalHapus ? (
				<Dialog>
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
									<WarningSvg />
								</div>
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3
										className="text-lg font-medium leading-6 text-gray-900"
										id="modal-title"
									>
										Yakin Hapus pengeluaran {select.title} ?
									</h3>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Apa anda yakin ? semua data akan
											dihapus secara permanent. Aksi ini
											tidak bisa dibatalkan.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								onClick={confirmHapus}
								disabled={hapusMutate.isLoading}
								className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
								type="button"
							>
								{hapusMutate.isLoading ? (
									<SpinnerSmallWhite />
								) : (
									"Hapus"
								)}
							</button>

							<button
								type="button"
								onClick={() => setModaHapus(false)}
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

export default DetailExpense;

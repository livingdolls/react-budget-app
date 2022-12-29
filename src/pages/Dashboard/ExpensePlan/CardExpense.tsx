import { useRecoilState } from "recoil";
import ModalOpen from "../../../store/Modal";
import { Expense } from "../../../Types/Budget.types";
import Rupiah from "../../../utils/Rupiah";
import { DeleteSvg, EditSvg } from "../../../components/svg";
import { NavLink } from "react-router-dom";

type TCExpense = {
	num: number;
	data: Expense;
	del: (id: string, nama: string) => void;
	edit: (expense: Expense) => void;
	addExpense: () => void;
};

const CardExpense = ({ num, data, del, edit, addExpense }: TCExpense) => {
	let status = "#1aebb6";

	if (num >= 0 && num <= 10) {
		status = "#d63031";
	} else if (num >= 11 && num <= 20) {
		status = "#ff7675";
	} else if (num >= 21 && num <= 30) {
		status = "#fab1a0";
	} else if (num >= 31 && num <= 40) {
		status = "#ffeaa7";
	} else if (num >= 41 && num <= 50) {
		status = "#fdcb6e";
	} else if (num >= 51 && num <= 60) {
		status = "#74b9ff";
	} else if (num >= 61 && num <= 70) {
		status = "#0984e3";
	} else if (num >= 71 && num <= 80) {
		status = "#81ecec";
	} else if (num >= 81 && num <= 90) {
		status = "#55efc4";
	} else if (num >= 91 && num <= 100) {
		status = "#00b894";
	} else {
		status = "#1aebb6";
	}
	return (
		<div
			className="flex flex-col gap-10 sm:w-11/12 lg:w-5/12 bg-white  p-4  rounded-md shadow-xl"
			key={data.id_expensePlan}
		>
			{/* Header */}
			<div className="bg-accent-green-500 -m-4 p-3 text-cyan-50 text-lg font-bold rounded-t-md flex flex-row justify-between">
				<p className="text-md font-md">{data.title}</p>
				<p className="text-md font-md">{Rupiah(data.maxExpense)}</p>
			</div>

			<div className="py-1 px-1 flex flex-col ">
				{/* Progress */}

				<div className="w-full bg-gray-400 rounded-full h-8 dark:bg-gray-700">
					<div
						className=" h-8 rounded-full flex justify-end items-center"
						style={{
							width: `${num}%`,
							backgroundColor: status,
						}}
					>
						<p className="mr-5 text-white font-bold">{num} %</p>
					</div>
				</div>

				{/* Info */}

				<div className="flex justify-between py-2 mt-1">
					<div className="ml-2">
						<p className="font-bold text-md">
							{Rupiah(data.usage)}
						</p>
						<p className="text-xs">Terpakai</p>
					</div>

					<div>
						<p className="font-bold text-md">
							{Rupiah(data.maxExpense - data.usage)}
						</p>
						<p className="text-xs">Sisa</p>
					</div>
				</div>

				{/* Action */}
				<div className="flex justify-between items-center border-t-4 -mb-2">
					<div>
						<button
							type="button"
							onClick={addExpense}
							className="text-white mt-4 bg-accent-green-500 hover:bg-accent-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							Tambah
						</button>

						<NavLink
							to={`/home/expense-plan/${data.id_expensePlan}`}
						>
							<button
								type="button"
								onClick={addExpense}
								className="text-accent-green-500 mt-4 bg-white hover:bg-accent-green-500 hover:text-white border-accent-green-500 border-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2  focus:outline-none"
							>
								Lihat
							</button>
						</NavLink>
					</div>

					<div>
						<button
							onClick={() => edit(data)}
							className="bg-accent-green-500 font-bold text-white rounded-full p-2 hover:bg-accent-green-900"
						>
							<EditSvg />
						</button>

						<button
							className="bg-material-20 hover:bg-material-10 text-xs ml-1 text-white p-2 font-bold rounded-full"
							onClick={() => del(data.id_expensePlan, data.title)}
						>
							<DeleteSvg />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardExpense;

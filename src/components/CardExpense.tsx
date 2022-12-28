import { useRecoilState } from "recoil";
import { Expense } from "../pages/Dashboard/ExpensePlan";
import ModalOpen from "../store/Modal";
import Rupiah from "../utils/Rupiah";

type TCExpense = {
	num: number;
	data: Expense;
	del: (id: string, nama: string) => void;
};

const CardExpense = ({ num, data, del }: TCExpense) => {
	const [, setModal] = useRecoilState(ModalOpen);

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
				<button onClick={() => del(data.id_expensePlan, data.title)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</button>
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
					<button
						type="button"
						className="text-white mt-4 bg-accent-green-500 hover:bg-accent-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						onClick={() => setModal(true)}
					>
						Tambah
					</button>

					<p className="text-accent-green-900 text-xl font-medium">
						{Rupiah(data.maxExpense)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CardExpense;

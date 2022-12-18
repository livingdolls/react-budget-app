import { useEffect, useState } from "react";

const CardExpense = () => {
	const styles = {
		divClass: "w-full flex-grow lg:flex lg:items-center lg:w-auto",
	};
	const [height, setHeight] = useState<number>();

	useEffect(() => {
		setHeight(79);
	});
	return (
		<div className="flex flex-col gap-10 sm:w-11/12 lg:w-5/12 bg-slate-200  p-4  rounded-lg">
			{/* Header */}
			<div className="bg-yellow-500 -m-4 p-3 text-cyan-50 text-lg font-bold rounded-t-lg flex flex-row justify-between">
				<p>Header Card</p>
				<p>delete</p>
			</div>

			<div className="py-5 px-2 flex flex-col gap-5">
				{/* Progress */}
				<div className="w-full bg-gray-400 rounded-full h-8 dark:bg-gray-700">
					<div
						className={`bg-blue-600 h-8 rounded-full w-[${height}%] `}
					></div>
				</div>

				{/* Info */}

				<div className="flex justify-between py-2">
					<p className="text-xl font-semibold text-gray-800">
						Terpakai
					</p>
					<p className="text-xl font-semibold text-gray-800">Sisa</p>
				</div>

				{/* Action */}
				<div>
					<button
						type="button"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						Tambah
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardExpense;

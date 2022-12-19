import { useEffect, useState } from "react";

const CardExpense = ({ num, setVisible }: any) => {
	return (
		<div className="p-5 flex flex-col md:flex-row gap-4 flex-wrap justify-start md:items-baseline lg:justify-around">
			{/* Kedua */}

			<div className="flex flex-col gap-10 sm:w-11/12 lg:w-5/12 bg-white  p-4  rounded-md ">
				{/* Header */}
				<div className="bg-yellow-500 -m-4 p-3 text-cyan-50 text-lg font-bold rounded-t-md flex flex-row justify-between">
					<p>Header Card</p>
					<p>delete</p>
				</div>

				<div className="py-1 px-1 flex flex-col ">
					{/* Progress */}

					<div className="w-full bg-gray-400 rounded-full h-8 dark:bg-gray-700">
						<div
							className="bg-red-600 h-8 rounded-full flex justify-end items-center"
							style={{ width: `${num}%` }}
						>
							<p className="mr-5 text-white font-bold">{num} %</p>
						</div>
					</div>

					{/* Info */}

					<div className="flex justify-between py-2 mt-1">
						<p className="text-xl font-medium ml-3 text-gray-800">
							Terpakai
						</p>
						<p className="text-xl font-medium mr-3 text-gray-800">
							Sisa
						</p>
					</div>

					{/* Action */}
					<div>
						<button
							type="button"
							className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							onClick={() => setVisible(true)}
						>
							Tambah
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-10 sm:w-11/12 lg:w-5/12 bg-white  p-4  rounded-md ">
				{/* Header */}
				<div className="bg-yellow-500 -m-4 p-3 text-cyan-50 text-lg font-bold rounded-t-md flex flex-row justify-between">
					<p>Header Card</p>
					<p>delete</p>
				</div>

				<div className="py-1 px-1 flex flex-col ">
					{/* Progress */}

					<div className="w-full bg-gray-400 rounded-full h-8 dark:bg-gray-700">
						<div
							className="bg-red-600 h-8 rounded-full flex justify-end items-center"
							style={{ width: `${num}%` }}
						>
							<p className="mr-5 text-white font-bold">{num} %</p>
						</div>
					</div>

					{/* Info */}

					<div className="flex justify-between py-2 mt-1">
						<p className="text-xl font-medium ml-3 text-gray-800">
							Terpakai
						</p>
						<p className="text-xl font-medium mr-3 text-gray-800">
							Sisa
						</p>
					</div>

					{/* Action */}
					<div>
						<button
							type="button"
							className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							onClick={() => setVisible(true)}
						>
							Tambah
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardExpense;

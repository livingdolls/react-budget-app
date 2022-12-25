import { useEffect, useState } from "react";

const CardExpense = ({ num, setVisible }: any) => {
	return (
		<div className="p-5 flex flex-col md:flex-row gap-4 flex-wrap justify-start md:items-baseline lg:justify-around">
			{/* Kedua */}
			<div className="flex flex-col gap-10 sm:w-11/12 lg:w-5/12 bg-white  p-4  rounded-md shadow-xl">
				{/* Header */}
				<div className="bg-yellow-500 -m-4 p-3 text-cyan-50 text-lg font-bold rounded-t-md flex flex-row justify-between">
					<p>Header Card</p>
					<p>
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
					</p>
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

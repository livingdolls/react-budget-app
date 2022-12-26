import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, Route, Routes } from "react-router-dom";
import CardExpense from "../../components/CardExpense";
import Modal from "../../components/Modal";
import { Spinner, SpinnerWhite } from "../../components/Spinner";
import client from "../../config/axios";
import AuthContext from "../../context/Auth.context";
import AddExpensePlan from "./AddExpensePlan";
import ExpensePlan from "./ExpensePlan";
import Income from "./Income";

const getMainBudget = async (id: any) => {
	const getBudget = await client.get(`/mainBudget/${id}`);

	if (getBudget.statusText !== "OK") {
		throw new Error("gagal mengambil data");
	}

	return getBudget.data.data;
};

const Main = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const auth = useContext(AuthContext);

	const { data, isError, isLoading, isSuccess, isFetching } = useQuery(
		"budget",
		() => getMainBudget(auth?.auth)
	);

	const handleModal = () => {
		setVisible(!visible);
	};
	return (
		<div className=" lg:container mx-auto sm:w-10/12 xs:w-11/12 border-cyan-500 ">
			<div className="flex justify-center p-10 bg-accent-green-500 items-center align-baseline">
				{isFetching ? (
					<SpinnerWhite />
				) : (
					<p className="text-white">error, cek koneksi anda!</p>
				)}
				<button
					type="button"
					className="text-indigo-500 text-bold mt-4 bg-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					onClick={handleModal}
				>
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
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
				<p className="text-white text-4xl">RP {data?.maxBudget}</p>
			</div>

			<div className="p-5 flex justify-center ">
				<NavLink
					className={({ isActive }) =>
						isActive
							? "m-2 px-5 py-2 bg-accent-green-500 font-bold rounded-md text-white hover:bg-accent-green-900"
							: "m-2 px-5 py-2  font-bold rounded-md text-accent-green-900"
					}
					to="/home/"
				>
					<p>EXPENSE PLAN</p>
				</NavLink>

				<NavLink
					className={({ isActive }) =>
						isActive
							? "m-2 px-5 py-2 bg-accent-green-500 font-bold rounded-md text-white hover:bg-accent-green-900"
							: "m-2 px-5 py-2  font-bold rounded-md text-accent-green-900"
					}
					to="/home/income"
				>
					INCOME
				</NavLink>
			</div>

			<div className="">
				<Routes>
					<Route index element={<ExpensePlan />} />
					<Route path="/income" element={<Income />} />
				</Routes>
			</div>

			<div>
				<Modal judul={"Tambah Pengeluaran"}>
					<AddExpensePlan handleModal={handleModal} />
				</Modal>
			</div>
		</div>
	);
};

export default Main;

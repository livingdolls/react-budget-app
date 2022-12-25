import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CardExpense from "../components/CardExpense";
import Modal from "../components/Modal";
import client from "../config/axios";
import AuthContext from "../context/Auth.context";

const getMainBudget = async (id: any) => {
	const getBudget = await client.get(`/mainBudget/${id}`);

	if (getBudget.statusText !== "OK") {
		throw new Error("gagal mengambil data");
	}

	return getBudget.data.data;
};

const Main = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [budget, setBudget] = useState();
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
			<div className="flex justify-center p-10 bg-indigo-500 items-center align-baseline">
				{isFetching ? "Sedang mengambil data..." : ""}
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

			<div>
				<CardExpense num={45} setVisible={setVisible} />
			</div>

			<div>
				<Modal visible={visible} setVisible={setVisible}>
					<form>
						<div className="mb-6">
							<label
								htmlFor={"income"}
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Add Income
							</label>
							<input
								type="text"
								id="income"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Gaji Bulan ini"
								required
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor={"budget"}
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Budget
							</label>
							<input
								type="number"
								id="budget"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="5000000"
								required
							/>
						</div>

						<div className="">
							<button
								type="button"
								className="text-white text-bold mt-4 bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
								onClick={handleModal}
							>
								Tambah Budget
							</button>
						</div>
					</form>
				</Modal>
			</div>
		</div>
	);
};

export default Main;

import { useState } from "react";
import { useQuery } from "react-query";
import { NavLink, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Modal from "../../components/Modal";
import { SpinnerWhite } from "../../components/Spinner";
import { ViewExpensePlan } from "../../Services/ExpansePlan";
import AuthUser, { ProfileUser } from "../../store/Auth.store";
import ModalOpen from "../../store/Modal";
import Rupiah from "../../utils/Rupiah";
import AddExpensePlan from "./AddExpensePlan";
import ExpensePlan from "./ExpensePlan";
import Income from "./Income";

const Main = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [expense, setExpense] = useRecoilState(ModalOpen);
	const datas = useRecoilValue(ProfileUser);
	const [user] = useRecoilState(AuthUser);
	const [budget, setBudget] = useState({
		userId: "",
		id_main_budget: "",
		maxBudget: 0,
		expensive: [],
		created_at: "",
	});

	const { data, isError, isLoading, isSuccess, isFetching } = useQuery(
		"budget",
		() => ViewExpensePlan(datas.id_user, user),
		{
			onSuccess: (budgets) => {
				setBudget(budgets.data.data);
			},
		}
	);

	const handleModal = () => {
		setVisible(!visible);
	};

	const handleModalExpense = () => {
		setExpense(!expense);
	};
	return (
		<div className=" lg:container mx-auto sm:w-10/12 xs:w-11/12 border-cyan-500 ">
			<div className="flex justify-center p-10 bg-accent-green-500 items-center align-baseline">
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
				{isFetching ? (
					<SpinnerWhite />
				) : (
					<p className="text-white text-4xl">
						{Rupiah(budget.maxBudget)}
					</p>
				)}
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
			<div className="w-[80%] border-b-2 mx-auto border-accent-green-500"></div>

			<div className="w-full flex justify-around mt-4">
				<button
					onClick={handleModalExpense}
					className="px-2 py-2.5 hover:bg-accent-green-900 bg-accent-green-500 rounded-md text-white font-bold "
				>
					Tambah Rencana Pengeluaran
				</button>

				<button>Info</button>
			</div>

			<div className="">
				<Routes>
					<Route
						index
						element={<ExpensePlan expense={budget.expensive} />}
					/>
					<Route path="/income" element={<Income />} />
				</Routes>
			</div>

			<div>
				<Modal judul={"Tambah Pengeluaran"}>
					<AddExpensePlan
						handleModalExpense={handleModalExpense}
						exp={budget.expensive}
						idBudget={budget.id_main_budget}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default Main;

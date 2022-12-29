import { useState } from "react";
import { useQuery } from "react-query";
import { NavLink, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import MainModal from "../../components/MainModal";
import Modal from "../../components/Modal";
import { SpinnerWhite } from "../../components/Spinner";
import { ViewExpensePlan } from "../../Services/ExpansePlan";
import AuthUser, { ProfileUser } from "../../store/Auth.store";
import ModalOpen from "../../store/Modal";
import Rupiah from "../../utils/Rupiah";
import AddExpensePlan from "./ExpensePlan/AddExpensePlan";
import AddIncome from "./AddIncome";
import Income from "./Income/Income";
import ExpensePlan from "./ExpensePlan";
import Budget from "./Income";
import { AddSvg } from "../../components/svg";
import DetailExpense from "./Expense/DetailExpense";
import { ClimbingBoxLoader } from "react-spinners";
import BudgetStore from "../../store/Budget.store";
import SumExpense from "../../utils/SumExpense";

const Main = () => {
	const [expense, setExpense] = useRecoilState(ModalOpen);
	const datas = useRecoilValue(ProfileUser);
	const [user] = useRecoilState(AuthUser);
	const [income, setIncome] = useState<boolean>(false);
	const [budget, setBudget] = useRecoilState(BudgetStore);

	const {
		data: budgets,
		isError,
		isLoading,
		isSuccess,
		isFetching,
		refetch,
	} = useQuery("budget", () => ViewExpensePlan(datas.id_user, user), {
		onSuccess: (budgets) => {
			const usage = SumExpense(budgets.data.expensive);
			setBudget({
				...budget,
				budget: budgets.data.maxBudget,
				usage: usage,
			});
		},
	});

	const handleModalExpense = () => {
		setExpense(!expense);
	};

	const handleIncome = () => {
		setIncome(!income);
	};

	if (isLoading) {
		return (
			<div className="h-screen w-screen flex justify-center flex-col items-center content-center">
				<ClimbingBoxLoader color="#36d7b7" size={50} />
			</div>
		);
	}

	return (
		<div className=" lg:container mx-auto sm:w-10/12 xs:w-11/12 border-cyan-500 ">
			<div className="flex justify-center p-10 bg-accent-green-500 items-center align-baseline">
				<button
					type="button"
					className="text-white hover:bg-accent-green-900 focus:ring-4 focus:ring-accent-green-500 font-bold rounded-lg text-lg px-2 py-2  focus:outline-none dark:focus:ring-blue-800"
					onClick={() => setIncome(true)}
				>
					<AddSvg />
				</button>

				<p className="text-white text-4xl">
					{Rupiah(budgets.data.maxBudget)}
				</p>
				{isFetching ? <SpinnerWhite /> : null}
			</div>

			{/* NAVLINK */}
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

				<NavLink
					className={({ isActive }) =>
						isActive
							? "m-2 px-5 py-2 bg-accent-green-500 font-bold rounded-md text-white hover:bg-accent-green-900"
							: "m-2 px-5 py-2  font-bold rounded-md text-accent-green-900"
					}
					to="/home/budget"
				>
					INFO BUDGET
				</NavLink>
			</div>
			{/* END LINK */}

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

			{/* ROUTE */}
			<div className="">
				<Routes>
					<Route
						index
						element={
							<ExpensePlan expense={budgets.data.expensive} />
						}
					/>
					<Route
						path="/income"
						element={<Income budget={budgets.data} />}
					/>
					<Route path="/budget" element={<Budget />} />
					<Route
						path="/expense-plan/:idExpensePlan"
						element={<DetailExpense />}
					/>
				</Routes>
			</div>
			{/* END ROUTE */}

			<div>
				<Modal judul={"Tambah Pengeluaran"}>
					<AddExpensePlan
						exp={budgets.data.expensive}
						idBudget={budgets.data.id_main_budget}
					/>
				</Modal>
			</div>

			{income ? (
				<MainModal judul={"Tambah Income"} action={handleIncome}>
					<AddIncome budget={budgets.data} action={handleIncome} />
				</MainModal>
			) : null}
		</div>
	);
};

export default Main;

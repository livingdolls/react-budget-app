import { useState } from "react";
import { useQuery } from "react-query";
import { NavLink, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import MainModal from "../../components/MainModal";
import Modal from "../../components/Modal";
import { SpinnerWhite } from "../../components/Spinner";
import { ViewExpensePlan } from "../../Services/ExpansePlan.service";
import AuthUser, { ProfileUser } from "../../store/Auth.store";
import ModalOpen from "../../store/Modal";
import Rupiah from "../../utils/Rupiah";
import AddExpensePlan from "./ExpensePlan/AddExpensePlan";
import AddIncome from "./Income/AddIncome";
import Income from "./Income/Income";
import ExpensePlan from "./ExpensePlan/ExpensePlan";
import Profil from "./Profil";
import { AddSvg } from "../../components/svg";
import DetailExpense from "./Expense/DetailExpense";
import { ClimbingBoxLoader } from "react-spinners";
import BudgetStore from "../../store/Budget.store";
import SumExpense from "../../utils/SumExpense";

const Menu = [
	{ to: "/home/", name: "Rencana Pengeluaran" },
	{ to: "/home/income", name: "Pemasukan" },
	{ to: "/home/budget", name: "Profile" },
];

const Main = () => {
	const [expense, setExpense] = useRecoilState(ModalOpen);
	const datas = useRecoilValue(ProfileUser);
	const [user] = useRecoilState(AuthUser);
	const [income, setIncome] = useState<boolean>(false);
	const [budget, setBudget] = useRecoilState(BudgetStore);

	const {
		data: budgets,
		isLoading,
		isFetching,
	} = useQuery("budget", () => ViewExpensePlan(datas.id_user, user), {
		onSuccess: (budgets) => {
			const usage = SumExpense(budgets.data.expensive);
			setBudget({
				...budget,
				budget: budgets.data.maxBudget,
				usage: usage,
			});
		},
		refetchOnWindowFocus: false,
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
				{Menu.map((e) => {
					return (
						<NavLink
							className={({ isActive }) =>
								isActive
									? "m-2 px-5 py-2 bg-accent-green-500 font-bold rounded-md text-white hover:bg-accent-green-900"
									: "m-2 px-5 py-2  font-bold rounded-md text-accent-green-900"
							}
							to={e.to}
							key={e.to}
						>
							<p>{e.name}</p>
						</NavLink>
					);
				})}
			</div>
			{/* END LINK */}

			<div className="w-[80%] border-b-2 mx-auto border-accent-green-500"></div>

			{/* ROUTE */}
			<div className="">
				<Routes>
					<Route
						index
						element={
							<ExpensePlan
								expense={budgets.data.expensive}
								handleModalExpense={handleModalExpense}
							/>
						}
					/>
					<Route
						path="/income"
						element={<Income budget={budgets.data} />}
					/>
					<Route path="/budget" element={<Profil />} />
					<Route
						path="/expense-plan/:idExpensePlan"
						element={<DetailExpense />}
					/>
				</Routes>
			</div>
			{/* END ROUTE */}

			<div>
				<Modal judul={"Tambah Pengeluaran"}>
					<AddExpensePlan idBudget={budgets.data.id_main_budget} />
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

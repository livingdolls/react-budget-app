import CardExpense from "../components/CardExpense";

const Main = () => {
	return (
		<div className="bg-red-500 ">
			<div className="flex justify-center p-10 bg-yellow-500 sticky">
				<p className="text-white text-4xl">RP 6.000.000</p>
			</div>

			<div className="p-5 flex flex-col md:flex-row gap-4 flex-wrap justify-center">
				<CardExpense />
				<CardExpense />
				<CardExpense />
				<CardExpense />
				<CardExpense />
				<CardExpense />
				<CardExpense />
				<CardExpense />
			</div>
		</div>
	);
};

export default Main;

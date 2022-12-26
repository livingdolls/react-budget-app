import CardExpense from "../../components/CardExpense";

const ExpensePlan = () => {
	return (
		<div className="p-5 flex flex-col md:flex-row gap-4 flex-wrap 2xl:justify-around xl:justify-around lg:justify-center justify-start md:items-baseline ">
			{" "}
			<CardExpense num={"5"} />;
			<CardExpense num={"15"} />;
			<CardExpense num={"25"} />;
			<CardExpense num={"35"} />;
			<CardExpense num={"45"} />;
			<CardExpense num={"55"} />;
			<CardExpense num={"65"} />;
			<CardExpense num={"75"} />;
			<CardExpense num={"85"} />;
			<CardExpense num={"95"} />;
		</div>
	);
};

export default ExpensePlan;

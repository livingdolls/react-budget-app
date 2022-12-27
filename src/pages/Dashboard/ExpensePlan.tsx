import CardExpense from "../../components/CardExpense";

export type Expense = {
	create_at?: string;
	idMainBudget: string;
	id_expensePlan: string;
	maxExpense: number;
	title: string;
	usage: number;
};

type TExpense = {
	expense: Expense[];
};

const ExpensePlan = ({ expense }: TExpense) => {
	console.log(expense);
	return (
		<div className="p-5 flex flex-col md:flex-row gap-4 flex-wrap 2xl:justify-around xl:justify-around lg:justify-center justify-start md:items-baseline ">
			{expense?.map((e) => {
				let percent = (e.usage / e.maxExpense) * 100;
				return <CardExpense num={percent} data={e} />;
			})}
		</div>
	);
};

export default ExpensePlan;

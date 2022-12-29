import { Expense } from "../Types/Budget.types";

const SumExpense = (exp: Expense[]) => {
	let total = 0;
	exp.map((e) => {
		total += e.maxExpense;
	});

	return total;
};

export default SumExpense;
